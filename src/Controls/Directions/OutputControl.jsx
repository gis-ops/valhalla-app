import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Segment, Button, Icon } from 'semantic-ui-react'
import L from 'leaflet'

import { makeRequest } from 'actions/directionsActions'
import { downloadFile } from 'actions/commonActions'
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
    super(props)

    this.state = {
      showResults: false
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
    // if (nextProps.activeTab === 1) {
    //   return false
    // }
    return true
  }

  showManeuvers() {
    this.setState({ showResults: !this.state.showResults })
  }

  exportToJson = e => {
    const { results } = this.props
    const coordinates = results[VALHALLA_OSM_URL].data.decodedGeometry

    const dateNow = new Date()
    const dformat =
      [dateNow.getMonth() + 1, dateNow.getDate(), dateNow.getFullYear()].join(
        '/'
      ) +
      '_' +
      [dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds()].join(':')

    e.preventDefault()
    downloadFile({
      data: JSON.stringify(L.polyline(coordinates).toGeoJSON()),
      fileName: 'valhalla-directions_' + dformat + '.geojson',
      fileType: 'text/json'
    })
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
          <div className={'flex justify-between'}>
            <Button
              size="mini"
              toggle
              active={this.state.showResults}
              onClick={this.showManeuvers}>
              {this.state.showResults ? 'Hide Maneuvers' : 'Show Maneuvers'}
            </Button>
            <div
              className={'flex pointer'}
              style={{ alignSelf: 'center' }}
              onClick={this.exportToJson}>
              <Icon circular name={'download'} />
              <div className={'pa1 b f6'}>{'Download'}</div>
            </div>
          </div>

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
