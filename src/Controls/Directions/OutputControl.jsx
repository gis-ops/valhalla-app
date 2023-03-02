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
import jsonFormat from 'json-format'
import { jsonConfig } from 'Controls/settings-options'

class OutputControl extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.string,
    activeTab: PropTypes.number,
    successful: PropTypes.bool,
    results: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      showResults: false,
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

  dateNow() {
    let dtNow = new Date()
    dtNow =
      [dtNow.getMonth() + 1, dtNow.getDate(), dtNow.getFullYear()].join('/') +
      '_' +
      [dtNow.getHours(), dtNow.getMinutes(), dtNow.getSeconds()].join(':')
    return dtNow
  }
  exportToJson = (e) => {
    const { results } = this.props
    const { data } = results[VALHALLA_OSM_URL]
    const formattedData = jsonFormat(data, jsonConfig)
    e.preventDefault()
    downloadFile({
      data: formattedData,
      fileName: 'valhalla-directions_' + this.dateNow() + '.json',
      fileType: 'text/json',
    })
  }

  exportToGeoJson = (e) => {
    const { results } = this.props
    const coordinates = results[VALHALLA_OSM_URL].data.decodedGeometry
    const formattedData = jsonFormat(
      L.polyline(coordinates).toGeoJSON(),
      jsonConfig
    )
    e.preventDefault()
    downloadFile({
      data: formattedData,
      fileName: 'valhalla-directions_' + this.dateNow() + '.geojson',
      fileType: 'text/json',
    })
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
          <Summary provider={VALHALLA_OSM_URL} />
          <div className={'flex justify-between'}>
            <Button
              size="mini"
              toggle
              active={this.state.showResults}
              onClick={this.showManeuvers}
            >
              {this.state.showResults ? 'Hide Maneuvers' : 'Show Maneuvers'}
            </Button>
            <div className={'flex'}>
              <div
                className={'flex pointer'}
                style={{ alignSelf: 'center' }}
                onClick={this.exportToJson}
              >
                <Icon circular name={'download'} />
                <div className={'pa1 b f6'}>{'JSON'}</div>
              </div>
              <div
                className={'ml2 flex pointer'}
                style={{ alignSelf: 'center' }}
                onClick={this.exportToGeoJson}
              >
                <Icon circular name={'download'} />
                <div className={'pa1 b f6'}>{'GeoJSON'}</div>
              </div>
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

const mapStateToProps = (state) => {
  const { profile, activeTab } = state.common
  const { successful, results } = state.directions
  return {
    profile,
    activeTab,
    successful,
    results,
  }
}

export default connect(mapStateToProps)(OutputControl)
