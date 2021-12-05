import { decode } from './polyline'

export const VALHALLA_OSM_URL = window._env_.VALHALLA_OSM

export const buildDirectionsRequest = ({
  profile,
  activeWaypoints,
  settings
}) => {
  let valhalla_profile = 'truck'
  if (profile == 'car') {
    valhalla_profile = 'auto'
  } else if (profile == 'bus') {
    valhalla_profile = 'bus'
  } else if (profile == 'bicycle') {
    valhalla_profile = 'bicycle'
  } else if (profile == 'pedestrian') {
    valhalla_profile = 'pedestrian'
  } else if (profile == 'motor_scooter') {
    valhalla_profile = 'motor_scooter'
  }

  const valhallaRequest = {
    json: {
      costing: valhalla_profile,
      costing_options: {
        [profile]: { ...settings }
      },
      exclude_polygons: settings.exclude_polygons,
      locations: makeLocations(activeWaypoints),
      directions_options: {
        units: 'kilometers'
      },
      id: 'valhalla-fossgiss-directions'
    }
  }
  return valhallaRequest
}

export const parseDirectionsGeometry = data => {
  const coordinates = []

  for (const feat of data.trip.legs) {
    coordinates.push(...decode(feat.shape, 6))
  }

  return coordinates
}

export const buildIsochronesRequest = ({
  profile,
  center,
  settings,
  maxRange,
  interval
}) => {
  const valhallaRequest = {
    json: {
      costing: profile == 'car' ? 'auto' : 'truck',
      costing_options: {
        [profile]: { ...settings }
      },
      contours: makeContours({ maxRange, interval }),
      locations: makeLocations([center]),
      directions_options: {
        units: 'kilometers'
      },
      id: 'valhalla-fossgis-isochrones'
    }
  }
  return valhallaRequest
}

const makeContours = ({ maxRange, interval }) => {
  let contours = []
  while (maxRange > 0) {
    contours.push({ time: maxRange })
    maxRange -= interval
  }
  contours = contours.reverse()
  return contours
}

const makeLocations = waypoints => {
  const locations = []
  for (const waypoint of waypoints) {
    locations.push({
      lon: waypoint.displaylnglat[0],
      lat: waypoint.displaylnglat[1]
    })
  }

  return locations
}
