import axios from 'axios'
import {
  ADD_WAYPOINT,
  CLEAR_WAYPOINTS,
  RECEIVE_GEOCODE_RESULTS,
  REQUEST_GEOCODE_RESULTS,
  SET_WAYPOINT,
  UPDATE_TEXTINPUT,
  EMPTY_WAYPOINT,
  INSERT_WAYPOINT,
  RECEIVE_ROUTE_RESULTS,
  CLEAR_ROUTES,
  TOGGLE_PROVIDER_ISO,
  HIGHLIGHT_MNV,
  ZOOM_TO_MNV
} from './types'
import {
  reverse_geocode,
  forward_geocode,
  parseGeocodeResponse
} from '../utils/nominatim'
import {
  VALHALLA_OSM_URL,
  buildDirectionsRequest,
  parseDirectionsGeometry
} from 'utils/valhalla'

import {
  sendMessage,
  showLoading,
  filterProfileSettings
} from './commonActions'

const serverMapping = {
  [VALHALLA_OSM_URL]: 'OSM'
}

export const makeRequest = () => (dispatch, getState) => {
  const { waypoints } = getState().directions
  const { profile } = getState().common
  let { settings } = getState().common
  // if 2 results are selected
  const activeWaypoints = []

  for (const waypoint of waypoints) {
    if (waypoint.geocodeResults.length > 0) {
      for (const result of waypoint.geocodeResults) {
        if (result.hasOwnProperty('selected') && result.selected) {
          activeWaypoints.push(result)
          break
        }
      }
    }
  }
  if (activeWaypoints.length >= 2) {
    settings = filterProfileSettings(profile, settings)

    console.log(settings)

    const valhallaRequest = buildDirectionsRequest({
      profile,
      activeWaypoints,
      settings
    })
    dispatch(fetchValhallaDirections(valhallaRequest))
  }
}

const fetchValhallaDirections = valhallaRequest => (dispatch, getState) => {
  dispatch(showLoading(true))

  axios
    .get(VALHALLA_OSM_URL + '/route', {
      params: valhallaRequest,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(({ data }) => {
      const geometry = parseDirectionsGeometry(data)
      data.decodedGeometry = geometry
      dispatch(registerRouteResponse(VALHALLA_OSM_URL, data))
    })
    .catch(({ response }) => {
      dispatch(clearRoutes(VALHALLA_OSM_URL))
      dispatch(
        sendMessage({
          type: 'warning',
          icon: 'warning',
          description: `${serverMapping[VALHALLA_OSM_URL]}: ${
            response.data.error
          }`,
          title: `${response.data.status}`
        })
      )
    })
    .finally(() => {
      setTimeout(() => {
        dispatch(showLoading(false))
      }, 500)
    })
}

export const registerRouteResponse = (provider, data) => ({
  type: RECEIVE_ROUTE_RESULTS,
  payload: {
    provider,
    data
  }
})

export const clearRoutes = provider => ({
  type: CLEAR_ROUTES,
  payload: provider
})

const placeholderAddress = (index, lng, lat) => dispatch => {
  // placeholder until gecoder is complete
  // will add latLng to input field
  const addresses = [
    {
      selected: false,
      title: '',
      displaylnglat: [lng, lat],
      key: index,
      addressindex: index
    }
  ]
  dispatch(receiveGeocodeResults({ addresses, index: index }))
  dispatch(
    updateTextInput({
      inputValue: [lng.toFixed(6), lat.toFixed(6)].join(', '),
      index: index,
      addressindex: 0
    })
  )
}

export const fetchReverseGeocode = object => (dispatch, getState) => {
  dispatch(requestGeocodeResults({ index: object.index, reverse: true }))
  const { waypoints } = getState().directions

  let { index } = object
  const { fromDrag } = object
  const { lng, lat } = object.latLng

  if (index === -1) {
    index = waypoints.length - 1
  } else if (index === 1 && !fromDrag) {
    // insert waypoint from context menu
    dispatch(doAddWaypoint(true))
    index = waypoints.length - 2
  }
  dispatch(placeholderAddress(index, lng, lat))

  dispatch(requestGeocodeResults({ index, reverse: true }))

  reverse_geocode(lng, lat)
    .then(response => {
      dispatch(processGeocodeResponse(response.data, index, true, [lng, lat]))
    })
    .catch(error => {
      console.log(error) //eslint-disable-line
    })
  // .finally(() => {
  //   // always executed
  // })
}

export const fetchGeocode = object => dispatch => {
  dispatch(requestGeocodeResults({ index: object.index }))

  forward_geocode(object.inputValue)
    .then(response => {
      dispatch(processGeocodeResponse(response.data, object.index))
    })
    .catch(error => {
      console.log(error) //eslint-disable-line
    })
    .finally(() => {})
}

const processGeocodeResponse = (data, index, reverse, lngLat) => dispatch => {
  const addresses = parseGeocodeResponse(data, lngLat)
  // if no address can be found
  if (addresses.length == 0) {
    dispatch(
      sendMessage({
        type: 'warning',
        icon: 'warning',
        description: 'Sorry, no addresses can be found.',
        title: 'No addresses'
      })
    )

    for (const results of document.getElementsByClassName('results')) {
      results.classList.remove('visible')
    }
  }
  dispatch(receiveGeocodeResults({ addresses, index }))

  // this is the ULTRA hack to move the semantic ui results around
  // to fit them on the screen, they will overflow otherwise
  if (addresses.length > 0) {
    for (const results of document.getElementsByClassName('results')) {
      document.getElementById(window._env_.ROOT_ELEMENT).appendChild(results)
    }
  }
  if (reverse) {
    dispatch(
      updateTextInput({
        inputValue: addresses[0].title,
        index: index,
        addressindex: 0
      })
    )
    dispatch(makeRequest())
  }
}

export const receiveGeocodeResults = object => ({
  type: RECEIVE_GEOCODE_RESULTS,
  payload: object
})

export const requestGeocodeResults = object => ({
  type: REQUEST_GEOCODE_RESULTS,
  payload: object
})

export const updateTextInput = object => ({
  type: UPDATE_TEXTINPUT,
  payload: object
})

export const doRemoveWaypoint = index => (dispatch, getState) => {
  if (index == undefined) {
    dispatch(clearWaypoints())
    Array(2)
      .fill()
      .map((_, i) => dispatch(doAddWaypoint()))
  } else {
    const waypoints = getState().directions.waypoints
    if (waypoints.length > 2) {
      dispatch(clearWaypoints(index))
      dispatch(makeRequest())
    } else {
      dispatch(emptyWaypoint(index))
    }
  }
}

export const highlightManeuver = fromTo => (dispatch, getState) => {
  const highlightSegment = getState().directions.highlightSegment

  // this is dehighlighting
  if (
    highlightSegment.startIndex == fromTo.startIndex &&
    highlightSegment.endIndex == fromTo.endIndex
  ) {
    fromTo.startIndex = -1
    fromTo.endIndex = -1
  }

  dispatch({
    type: HIGHLIGHT_MNV,
    payload: fromTo
  })
}

export const zoomToManeuver = zoomObj => ({
  type: ZOOM_TO_MNV,
  payload: zoomObj
})

export const clearWaypoints = index => ({
  type: CLEAR_WAYPOINTS,
  payload: { index: index }
})

export const emptyWaypoint = index => ({
  type: EMPTY_WAYPOINT,
  payload: { index: index }
})

export const doAddWaypoint = doInsert => (dispatch, getState) => {
  const waypoints = getState().directions.waypoints
  let maxIndex = Math.max.apply(
    Math,
    waypoints.map(wp => {
      return wp.id
    })
  )
  maxIndex = isFinite(maxIndex) == false ? 0 : maxIndex + 1

  const emptyWp = {
    id: maxIndex.toString(),
    geocodeResults: [],
    userInput: ''
  }
  if (doInsert) {
    dispatch(insertWaypoint(emptyWp))
  } else {
    dispatch(addWaypoint(emptyWp))
  }
}

const insertWaypoint = waypoint => ({
  type: INSERT_WAYPOINT,
  payload: waypoint
})

export const addWaypoint = waypoint => ({
  type: ADD_WAYPOINT,
  payload: waypoint
})

export const setWaypoints = waypoints => ({
  type: SET_WAYPOINT,
  payload: waypoints
})

export const showProvider = (provider, show) => ({
  type: TOGGLE_PROVIDER_ISO,
  payload: {
    provider,
    show
  }
})
