import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Segment, Button } from 'semantic-ui-react'

import { makeRequest } from '../../actions/directionsActions'
import Summary from './Summary'
import Maneuvers from './Maneuvers'
import { VALHALLA_OSM_URL } from 'utils/valhalla'

class OutputControl extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.string,
    activeTab: PropTypes.number,
    successful: PropTypes.bool,
    results: PropTypes.object
  }

  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props)

    // Set the state directly. Use props if necessary.
    this.state = {
      showResults: true
    }
    this.showManeuvers = this.showManeuvers.bind(this)
  }

  // necessary to calculate new routes the tab was changed from isochrone tab
  // need to do this every time, because "profile" is global (otherwise we would
  // calculate new when the profile was changed while being on the iso tab)
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.activeTab === 0 && this.props.activeTab === 1) {
      nextProps.dispatch(makeRequest())
    }
    if (nextProps.activeTab === 1) {
      return false
    }
    return true
  }

  showManeuvers() {
    this.setState({ showResults: !this.state.showResults })
  }

  render() {
    const { successful } = this.props

    return (
      <Segment
        style={{
          margin: '0 1rem 10px',
          display: successful ? 'block' : 'none'
        }}>
        <div className={'flex-column'}>
          <div className={'flex justify-between pb3 pointer'}>
            <Summary provider={VALHALLA_OSM_URL} />
          </div>
          <Button
            size="mini"
            toggle
            active={this.state.showResults}
            onClick={this.showManeuvers}>
            {this.state.showResults ? 'Hide Maneuvers' : 'Show Maneuvers'}
          </Button>

          {this.state.showResults ? (
            <div className={'flex-column'}>
              <Maneuvers provider={VALHALLA_OSM_URL} />
            </div>
          ) : null}
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const { profile, activeTab } = state.common
  const { successful, results } = state.directions
  return {
    profile,
    activeTab,
    successful,
    results
  }
}

export default connect(mapStateToProps)(OutputControl)
