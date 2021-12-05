import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import L from 'leaflet'
import '@geoman-io/leaflet-geoman-free'
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import ExtraMarkers from './extraMarkers'
import { Button } from 'semantic-ui-react'

import { fetchReverseGeocode } from 'actions/directionsActions'
import { fetchReverseGeocodeIso } from '../actions/isochronesActions'
import { updateSettings } from '../actions/commonActions'
import { VALHALLA_OSM_URL } from '../utils/valhalla'

const OSMTiles = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
)

// defining the container styles the map sits in
const style = {
  width: '100%',
  height: '100vh'
}

// for this app we create two leaflet layer groups to control, one for the isochrone centers and one for the isochrone contours
const isoCenterLayer = L.featureGroup()
const isoPolygonLayer = L.featureGroup()
const routeMarkersLayer = L.featureGroup()
const routeLineStringLayer = L.featureGroup()
const highlightRouteSegmentlayer = L.featureGroup()
const highlightRouteIndexLayer = L.featureGroup()
const excludePolygonsLayer = L.featureGroup()

// a leaflet map consumes parameters, I'd say they are quite self-explanatory
const mapParams = {
  center: [48.209346, 16.372719],
  zoomControl: false,
  zoom: 10,
  maxZoom: 18,
  minZoom: 3,
  layers: [
    isoCenterLayer,
    routeMarkersLayer,
    isoPolygonLayer,
    routeLineStringLayer,
    highlightRouteSegmentlayer,
    highlightRouteIndexLayer,
    excludePolygonsLayer,
    OSMTiles
  ]
}

const routeObjects = {
  [VALHALLA_OSM_URL]: {
    color: '#cc0000',
    name: 'OSM'
  }
}

// this you have seen before, we define a react component
class Map extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    directions: PropTypes.object,
    isochrones: PropTypes.object,
    profile: PropTypes.string,
    activeTab: PropTypes.number,
    activeDataset: PropTypes.string,
    showRestrictions: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.layerControl = null
    this.state = {
      showPopup: false
    }
  }

  // and once the component has mounted we add everything to it
  componentDidMount() {
    // our map!
    //const { dispatch } = this.props

    this.map = L.map('map', mapParams)

    // we create a leaflet pane which will hold all isochrone polygons with a given opacity
    const isochronesPane = this.map.createPane('isochronesPane')
    isochronesPane.style.opacity = 0.9

    // our basemap and add it to the map
    const baseMaps = {
      OpenStreetMap: OSMTiles
    }

    const overlayMaps = {
      Waypoints: routeMarkersLayer,
      'Isochrone Center': isoCenterLayer,
      Routes: routeLineStringLayer,
      Isochrones: isoPolygonLayer
    }

    this.layerControl = L.control.layers(baseMaps, overlayMaps).addTo(this.map)

    // we do want a zoom control
    L.control
      .zoom({
        position: 'topright'
      })
      .addTo(this.map)

    //and for the sake of advertising your company, you may add a logo to the map
    const brand = L.control({
      position: 'bottomright'
    })
    brand.onAdd = map => {
      const div = L.DomUtil.create('div', 'brand')
      div.innerHTML =
        '<a href="https://fossgis.de" target="_blank"><div class="fossgis-logo"></div></a>'
      return div
    }

    this.map.addControl(brand)

    const popup = L.popup({ className: 'add-job' })

    this.map.on('contextmenu', event => {
      popup
        .setLatLng(event.latlng)
        //.addTo(this.map)
        //.setContent('lol')
        .openOn(this.map)

      setTimeout(() => {
        // as setContent needs the react dom we are setting the state here
        // to showPopup which then again renders a react portal in the render
        // return function..
        this.setState({ showPopup: true, latLng: event.latlng })

        popup.update()
      }, 20) //eslint-disable-line
    })

    // add Leaflet-Geoman controls with some options to the map
    this.map.pm.addControls({
      position: 'bottomright',
      drawCircle: false,
      drawMarker: false,
      drawPolyline: false,
      cutPolygon: false,
      drawCircleMarker: false,
      drawRectangle: false,
      dragMode: true,
      allowSelfIntersection: false,
      editPolygon: true,
      deleteLayer: true
    })

    this.map.pm.setGlobalOptions({
      layerGroup: excludePolygonsLayer
    })

    this.map.on('pm:create', ({ layer }) => {
      layer.on('pm:edit', e => {
        this.updateExcludePolygons()
      })
      layer.on('pm:dragend', e => {
        this.updateExcludePolygons()
      })
      this.updateExcludePolygons()
    })

    this.map.on('pm:remove', e => {
      this.updateExcludePolygons()
    })

    // this.map.on('moveend', () => {
    //   dispatch(doUpdateBoundingBox(this.map.getBounds()))
    // })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      // we want to make sure only the addresses are compared

      !R.equals(
        this.props.directions.selectedAddresses,
        nextProps.directions.selectedAddresses
      ) ||
      !R.equals(
        this.props.isochrones.selectedAddress,
        nextProps.isochrones.selectedAddress
      )
    ) {
      return true
    }

    if (this.state.showPopup || nextState.showPopup) {
      return true
    }

    if (this.props.directions.successful !== nextProps.directions.successful) {
      return true
    }

    if (this.props.isochrones.successful !== nextProps.isochrones.successful) {
      return true
    }

    if (
      !R.equals(this.props.directions.results, nextProps.directions.results)
    ) {
      return true
    }

    if (
      !R.equals(
        this.props.directions.highlightSegment,
        nextProps.directions.highlightSegment
      )
    ) {
      return true
    }

    if (
      !R.equals(this.props.directions.zoomObj, nextProps.directions.zoomObj)
    ) {
      return true
    }

    if (
      !R.equals(this.props.isochrones.results, nextProps.isochrones.results)
    ) {
      return true
    }

    if (!R.equals(this.props.showRestrictions, nextProps.showRestrictions)) {
      return true
    }

    if (this.props.activeDataset !== nextProps.activeDataset) {
      return true
    }

    return false
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.addWaypoints()
    this.addIsoCenter()
    this.addIsochrones()

    if (
      prevProps.directions.zoomObj.timeNow <
      this.props.directions.zoomObj.timeNow
    ) {
      this.zoomTo(this.props.directions.zoomObj.index)
    }

    this.addRoutes()
    this.handleHighlightSegment()

    const { directions, isochrones } = this.props

    if (!directions.successful) {
      routeLineStringLayer.clearLayers()
    }
    if (!isochrones.successful) {
      isoPolygonLayer.clearLayers()
    }
  }

  zoomTo = idx => {
    const { results } = this.props.directions

    const coords = results[VALHALLA_OSM_URL].data.decodedGeometry

    this.map.setView(coords[idx], 17)

    const highlightMarker = ExtraMarkers.icon({
      icon: 'fa-coffee',
      markerColor: 'blue',
      shape: 'circle',
      prefix: 'fa',
      iconColor: 'white'
    })

    L.marker(coords[idx], {
      icon: highlightMarker,
      pmIgnore: true
    }).addTo(highlightRouteIndexLayer)

    setTimeout(() => {
      highlightRouteIndexLayer.clearLayers()
    }, 1000)
  }

  getIsoTooltip = (contour, area, provider) => {
    const { profile } = this.props

    return `
    <div class="ui list">
        <div class="item">
        <div class="header">
            ${routeObjects[provider].name}
        </div>
        
        </div>
        <div class="item">
          <i class="${profile} icon"></i>
          <div class="content">
            ${profile}
          </div>
        </div>
        <div class="item">
          <i class="time icon"></i>
          <div class="content">
            ${contour} mins
          </div>
        </div>
        <div class="item">
          <i class="arrows alternate icon"></i>
          <div class="content">
            ${area} km2
          </div>
        </div>
      </div>
    `
  }

  handleHighlightSegment = () => {
    const { highlightSegment, results } = this.props.directions

    const coords = results[VALHALLA_OSM_URL].data.decodedGeometry

    const { startIndex, endIndex } = highlightSegment
    if (startIndex > -1 && endIndex > -1) {
      L.polyline(coords.slice(startIndex, endIndex + 1), {
        color: 'yellow',
        weight: 4,
        opacity: 1,
        pmIgnore: true
      }).addTo(highlightRouteSegmentlayer)
    } else {
      highlightRouteSegmentlayer.clearLayers()
    }
  }

  addIsochrones = () => {
    const { results } = this.props.isochrones
    isoPolygonLayer.clearLayers()

    for (const provider of [VALHALLA_OSM_URL]) {
      if (
        Object.keys(results[provider].data).length > 0 &&
        results[provider].show
      ) {
        for (const feature of results[provider].data.features) {
          const coords_reversed = []
          for (const latLng of feature.geometry.coordinates) {
            coords_reversed.push([latLng[1], latLng[0]])
          }

          L.polygon(coords_reversed, {
            ...feature.properties,
            color: 'white',
            weight: 2,
            opacity: 1.0,
            pane: 'isochronesPane',
            pmIgnore: true
          })
            .bindTooltip(
              this.getIsoTooltip(
                feature.properties.contour,
                feature.properties.area.toFixed(2),
                provider
              ),
              {
                permanent: false,
                sticky: true
              }
            )
            .addTo(isoPolygonLayer)
        }
      }
    }
  }

  getRouteToolTip = (summary, provider) => {
    const { profile } = this.props

    return `
    <div class="ui list">
        <div class="item">
        <div class="header">
            ${routeObjects[provider].name}
        </div>

        </div>
        <div class="item">
          <i class="${profile} icon"></i>
          <div class="content">
            ${profile}
          </div>
        </div>
        <div class="item">
          <i class="arrows alternate horizontal icon"></i>
          <div class="content">
            ${summary.length.toFixed(1)} km
          </div>
        </div>
        <div class="item">
          <i class="time icon"></i>
          <div class="content">
            ${new Date(summary.time * 1000).toISOString().substr(11, 5)} h
          </div>
        </div>
      </div>
    `
  }

  addRoutes = () => {
    const { results } = this.props.directions
    routeLineStringLayer.clearLayers()

    if (
      Object.keys(results[VALHALLA_OSM_URL].data).length > 0 &&
      results[VALHALLA_OSM_URL].show
    ) {
      const coords = results[VALHALLA_OSM_URL].data.decodedGeometry
      const summary = results[VALHALLA_OSM_URL].data.trip.summary
      L.polyline(coords, {
        color: '#FFF',
        weight: 9,
        opacity: 1,
        pmIgnore: true
      }).addTo(routeLineStringLayer)
      L.polyline(coords, {
        color: routeObjects[VALHALLA_OSM_URL].color,
        weight: 5,
        opacity: 1,
        pmIgnore: true
      })
        .addTo(routeLineStringLayer)
        .bindTooltip(this.getRouteToolTip(summary, VALHALLA_OSM_URL), {
          permanent: false,
          sticky: true
        })
    }
  }

  handleAddWaypoint = (data, e) => {
    this.map.closePopup()
    this.updateWaypointPosition({
      latLng: this.state.latLng,
      index: e.index
    })
  }

  handleAddIsoWaypoint = (data, e) => {
    this.map.closePopup()
    const { latLng } = this.state
    this.updateIsoPosition(latLng)
  }

  updateExcludePolygons() {
    const excludePolygons = []
    excludePolygonsLayer.eachLayer(layer => {
      const lngLatArray = []
      for (const coords of layer._latlngs[0]) {
        lngLatArray.push([coords.lng, coords.lat])
      }
      excludePolygons.push(lngLatArray)
    })

    const { dispatch } = this.props

    const name = 'exclude_polygons'
    const value = excludePolygons

    dispatch(
      updateSettings({
        name,
        value
      })
    )
  }

  updateWaypointPosition(object) {
    const { dispatch } = this.props
    dispatch(fetchReverseGeocode(object))
  }

  updateIsoPosition(coord) {
    const { dispatch } = this.props
    dispatch(fetchReverseGeocodeIso(coord.lng, coord.lat))
  }

  addIsoCenter = () => {
    isoCenterLayer.clearLayers()
    const { geocodeResults } = this.props.isochrones
    for (const address of geocodeResults) {
      if (address.selected) {
        const isoMarker = ExtraMarkers.icon({
          icon: 'fa-number',
          markerColor: 'purple',
          shape: 'star',
          prefix: 'fa',
          number: '1'
        })

        L.marker([address.displaylnglat[1], address.displaylnglat[0]], {
          icon: isoMarker,
          draggable: true,
          pmIgnore: true
        })
          .addTo(isoCenterLayer)
          .bindTooltip(address.title, { permanent: false })
          //.openTooltip()
          .on('dragend', e => {
            this.updateIsoPosition(e.target.getLatLng())
          })
      }
    }
  }

  addWaypoints() {
    routeMarkersLayer.clearLayers()
    const { waypoints } = this.props.directions
    let index = 0
    for (const waypoint of waypoints) {
      for (const address of waypoint.geocodeResults) {
        if (address.selected) {
          const wpMarker = ExtraMarkers.icon({
            icon: 'fa-number',
            markerColor: 'green',
            //shape: 'star',
            prefix: 'fa',
            number: (index + 1).toString()
          })

          L.marker([address.displaylnglat[1], address.displaylnglat[0]], {
            icon: wpMarker,
            draggable: true,
            index: index,
            pmIgnore: true
          })
            .addTo(routeMarkersLayer)
            .bindTooltip(address.title, {
              permanent: false
            })
            //.openTooltip()
            .on('dragend', e => {
              this.updateWaypointPosition({
                latLng: e.target.getLatLng(),
                index: e.target.options.index,
                fromDrag: true
              })
            })
        }
      }
      index += 1
    }
  }

  render() {
    const { activeTab } = this.props
    const MapPopup = () => {
      return (
        <React.Fragment>
          {activeTab == 0 ? (
            <React.Fragment>
              <Button.Group size="small" basic vertical>
                <Button index={0} onClick={this.handleAddWaypoint}>
                  Directions from here
                </Button>
                <Button index={1} onClick={this.handleAddWaypoint}>
                  Add as via point
                </Button>
                <Button index={-1} onClick={this.handleAddWaypoint}>
                  Directions to here
                </Button>
              </Button.Group>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button.Group size="small" basic vertical>
                <Button index={0} onClick={this.handleAddIsoWaypoint}>
                  Set center here
                </Button>
              </Button.Group>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    }
    const leafletPopupDiv = document.querySelector('.leaflet-popup-content')
    return (
      <React.Fragment>
        <div id="map" style={style} />
        {this.state.showPopup && leafletPopupDiv
          ? ReactDOM.createPortal(MapPopup(), leafletPopupDiv)
          : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { directions, isochrones, common } = state
  const { activeTab, profile, showRestrictions, activeDataset } = common
  return {
    directions,
    isochrones,
    profile,
    activeTab,
    activeDataset,
    showRestrictions
  }
}

export default connect(mapStateToProps)(Map)
