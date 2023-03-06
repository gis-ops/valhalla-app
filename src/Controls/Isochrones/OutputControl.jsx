import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Segment, Divider } from 'semantic-ui-react'

import Summary from './Summary'
import { makeIsochronesRequest } from 'actions/isochronesActions'
import ContoursInformation from './ContoursInformation'
import { VALHALLA_OSM_URL } from 'utils/valhalla'

class OutputControl extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.string,
    activeTab: PropTypes.number,
    successful: PropTypes.bool,
    results: PropTypes.object,
  }

  // necessary to calculate new routes the tab was changed from isochrone tab
  // need to do this every time, because "profile" is global (otherwise we would
  // calculate new when the profile was changed while being on the iso tab)
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.activeTab === 1 && this.props.activeTab === 0) {
      nextProps.dispatch(makeIsochronesRequest())
    }
    if (nextProps.activeTab === 0) {
      return false
    }
    return true
  }

  render() {
    const { successful } = this.props

    return (
      <Segment
        style={{
          margin: '0 1rem 10px',
          display: successful ? 'block' : 'none',
        }}
      >
        <div className={'flex-column'}>
          <div className={'flex justify-between pointer'}>
            <Summary provider={VALHALLA_OSM_URL} />
          </div>
          <Divider />
          <ContoursInformation provider={VALHALLA_OSM_URL} />
        </div>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  const { profile, activeTab } = state.common
  const { successful, results } = state.isochrones
  return {
    profile,
    activeTab,
    successful,
    results,
  }
}

export default connect(mapStateToProps)(OutputControl)
