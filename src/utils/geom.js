import * as turf from '@turf/turf'

export const calcArea = feature => {
  const polygon = turf.polygon([feature.geometry.coordinates])
  return turf.area(polygon) / 1000000
}
