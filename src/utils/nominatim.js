import axios from 'axios'

export const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
export const NOMINATIME_URL_REVERSE =
  'https://nominatim.openstreetmap.org/reverse'

export const forward_geocode = userInput =>
  axios.get(NOMINATIM_URL, {
    params: {
      // eslint-disable-next-line
      q: userInput,
      format: 'json',
      limit: 5
    }
  })

export const reverse_geocode = (lon, lat) =>
  axios.get(NOMINATIME_URL_REVERSE, {
    params: {
      lon: lon,
      lat: lat,
      format: 'json'
    }
  })

export const parseGeocodeResponse = (results, lngLat) => {
  if (!(Object.prototype.toString.call(results) === '[object Array]')) {
    results = [results]
  }
  const processedResults = []

  for (const [index, result] of results.entries()) {
    processedResults.push({
      title: result.display_name,
      description: result.osm_type + '(' + result.osm_id + ')',
      selected: false,
      displaylnglat:
        lngLat !== undefined
          ? lngLat
          : [parseFloat(result.lon), parseFloat(result.lat)],
      key: index,
      addressindex: index
    })
  }
  return processedResults
}
