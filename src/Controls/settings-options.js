const length = {
  name: 'Length',
  param: 'length',
  unit: 'm',
  description: 'The length of the vehicle',
  settings: {
    min: 1.0,
    max: 50.0,
    step: 0.5
  }
}

const width = {
  name: 'Width',
  param: 'width',
  unit: 'm',
  description: 'The width of the vehicle',
  settings: {
    min: 1.0,
    max: 10,
    step: 0.5
  }
}

const weight = {
  name: 'Weight',
  param: 'weight',
  unit: 'tons',
  description: 'The weight of the vehicle',
  settings: {
    min: 1,
    max: 100,
    step: 1
  }
}

const height = {
  name: 'Height',
  param: 'height',
  unit: 'm',
  description: 'The height of the vehicle',
  settings: {
    min: 1,
    max: 10,
    step: 0.5
  }
}

const axleLoad = {
  name: 'Axle load',
  param: 'axle_load',
  description: 'The axle load of the vehicle',
  unit: 'tons',
  settings: {
    min: 1,
    max: 50,
    step: 1
  }
}

const countryCrossingPenality = {
  name: 'Border penalty',
  param: 'country_crossing_penalty',
  description:
    'A penalty applied for a country crossing. This penalty can be used to create paths that avoid spanning country boundaries. The default penalty is 0.',
  unit: 'sec',
  settings: {
    min: 0,
    max: 1000,
    step: 60
  }
}

const countryCrossingCost = {
  name: 'Border cost',
  param: 'country_crossing_cost',
  description:
    'A cost applied when encountering an international border. This cost is added to the estimated and elapsed times. The default cost is 600 seconds.',
  unit: 'sec',
  settings: {
    min: 0,
    max: 5000,
    step: 100
  }
}

const turnPenalityCost = {
  name: 'Turn penalty',
  param: 'maneuver_penalty',
  description:
    'A penalty applied when transitioning between roads that do not have consistent naming–in other words, no road names in common. This penalty can be used to create simpler routes that tend to have fewer maneuvers or narrative guidance instructions. The default maneuver penalty is five seconds.',
  unit: 'sec',
  settings: {
    min: 0,
    max: 20,
    step: 1
  }
}

const hazardousMaterials = {
  name: 'Hazardous materials',
  description: 'Whether the vehicle is carrying hazardous materials',
  param: 'hazmat'
}

const useHighways = {
  name: 'Use Highways',
  param: 'use_highways',
  description:
    'This value indicates the willingness to take highways. Checking this will favor highways whilse unchecking it will try to avoid highways. Note that sometimes highways are required to complete a route so unchecking this does not guarantee to avoid highways entirely.',
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}
const useTollways = {
  name: 'Use Tollways',
  param: 'use_tolls',
  description:
    'This value indicates the willingness to take roads with tolls. Checking this option will not attempt to avoid them whilst unchecking this will attempt to avoid toll ways. Note that sometimes roads with tolls are required to complete a route so values of 0 are not guaranteed to avoid them entirely.',
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}
const useFerry = {
  name: 'Use Ferries',
  param: 'use_ferry',
  description:
    'This value indicates the willingness to take ferries. This is a range of values between 0 and 1. Values near 0 attempt to avoid ferries and values near 1 will favor ferries. The default value is 0.5. Note that sometimes ferries are required to complete a route so values of 0 are not guaranteed to avoid ferries entirely.',
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const ferryCost = {
  name: 'Ferry Cost',
  param: 'ferry_cost',
  description:
    'A cost applied when entering a ferry. This cost is added to the estimated and elapsed times. The default cost is 300 seconds (5 minutes).',
  unit: 'sec',
  settings: {
    min: 0,
    max: 5000,
    step: 100
  }
}

const useLivingStreets = {
  name: 'Use Living Streets',
  param: 'use_living_streets',
  description:
    'This value indicates the willingness to take living streets. This is a range of values between 0 and 1. Values near 0 attempt to avoid living streets and values near 1 will favor living streets. The default value is 0 for trucks, 0.1 for cars, buses, motor scooters and motorcycles. Note that sometimes living streets are required to complete a route so values of 0 are not guaranteed to avoid living streets entirely.',
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const useTracks = {
  name: 'Use Tracks',
  param: 'use_tracks',
  description:
    'This value indicates the willingness to take track roads. This is a range of values between 0 and 1. Values near 0 attempt to avoid tracks and values near 1 will favor tracks a little bit. The default value is 0 for autos, 0.5 for motor scooters and motorcycles. Note that sometimes tracks are required to complete a route so values of 0 are not guaranteed to avoid tracks entirely.',
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const privateAccessPenalty = {
  name: 'Private Access Penalty',
  param: 'private_access_penalty',
  description:
    'A penalty applied when a gate or bollard with access=private is encountered. The default private access penalty is 450 seconds.',
  unit: 'sec',
  settings: {
    min: 0,
    max: 5000,
    step: 100
  }
}

const ignoreClosures = {
  name: 'Ignore Closures',
  description:
    'If set to true, ignores all closures, marked due to live traffic closures, during routing. ',
  param: 'ignore_closures'
}

const closureFactor = {
  name: 'Closure Factor',
  param: 'closure_factor',
  description:
    "A factor that penalizes the cost when traversing a closed edge (eg: if search_filter.exclude_closures is false for origin and/or destination location and the route starts/ends on closed edges). Its value can range from 1.0 - don't penalize closed edges, to 10.0 - apply high cost penalty to closed edges. Default value is 9.0",
  unit: 'penalty',
  settings: {
    min: 1,
    max: 10,
    step: 0.5
  }
}

const servicePenalty = {
  name: 'Service Penalty',
  param: 'service_penalty',
  description:
    'A penalty applied for transition to generic service road. The default penalty is 0 trucks and 15 for cars, buses, motor scooters and motorcycles.',
  unit: 'penalty',
  settings: {
    min: 0,
    max: 100,
    step: 5
  }
}

const serviceFactor = {
  name: 'Service Factor',
  param: 'service_factor',
  description:
    'A factor that modifies (multiplies) the cost when generic service roads are encountered. The default service_factor is 1.',
  unit: 'factor',
  settings: {
    min: 1,
    max: 50,
    step: 1
  }
}

const excludeUnpaved = {
  name: 'Exclude Unpaved',
  description:
    'This value indicates the whether or not the path may include unpaved roads. If exclude_unpaved is set to 1 it is allowed to start and end with unpaved roads, but is not allowed to have them in the middle of the route path, otherwise they are allowed.',
  param: 'exclude_unpaved',
  unit: 'Yes/No',
  settings: {
    min: 0,
    max: 1,
    step: 1
  }
}

const shortest = {
  name: 'Shortest',
  description:
    'Changes the metric to quasi-shortest, i.e. purely distance-based costing. Note, this will disable all other costings & penalties. Also note, shortest will not disable hierarchy pruning, leading to potentially sub-optimal routes for some costing models. The default is false.',
  param: 'shortest'
}

const excludeCashOnlyTolls = {
  name: 'Exclude Cash Only Tolls',
  description:
    'A boolean value which indicates the desire to avoid routes with cash-only tolls.',
  param: 'exclude_cash_only_tolls'
}

const bicycleType = {
  name: 'Bicycle Type',
  description: `The type of bicycle. The default type is Hybrid.
  Road: a road-style bicycle with narrow tires that is generally lightweight and designed for speed on paved surfaces.
  Hybrid or City: a bicycle made mostly for city riding or casual riding on roads and paths with good surfaces.
  Cross: a cyclo-cross bicycle, which is similar to a road bicycle but with wider tires suitable to rougher surfaces.
  Mountain: a mountain bicycle suitable for most surfaces but generally heavier and slower on paved surfaces.`,
  param: 'bicycle_type',
  enums: [
    {
      key: 'Hybrid',
      text: 'Hybrid',
      value: 'Hybrid'
    },
    {
      key: 'Road',
      text: 'Road',
      value: 'Road'
    },
    {
      key: 'City',
      text: 'City',
      value: 'City'
    },
    {
      key: 'Cross',
      text: 'Cross',
      value: 'Cross'
    },
    {
      key: 'Mountain',
      text: 'Mountain',
      value: 'Mountain'
    }
  ]
}

const cyclingSpeed = {
  name: 'Cycling Speed',
  param: 'cycling_speed',
  description:
    'Cycling speed is the average travel speed along smooth, flat roads. This is meant to be the speed a rider can comfortably maintain over the desired distance of the route. It can be modified (in the costing method) by surface type in conjunction with bicycle type and (coming soon) by hilliness of the road section. When no speed is specifically provided, the default speed is determined by the bicycle type and are as follows: Road = 25 KPH (15.5 MPH), Cross = 20 KPH (13 MPH), Hybrid/City = 18 KPH (11.5 MPH), and Mountain = 16 KPH (10 MPH).',
  unit: 'kph',
  settings: {
    min: 5,
    max: 50,
    step: 1
  }
}

const useRoads = {
  name: 'Use Roads',
  param: 'use_roads',
  description:
    "A cyclist's propensity to use roads alongside other vehicles. This is a range of values from 0 to 1, where 0 attempts to avoid roads and stay on cycleways and paths, and 1 indicates the rider is more comfortable riding on roads. Based on the use_roads factor, roads with certain classifications and higher speeds are penalized in an attempt to avoid them when finding the best path. The default value is 0.5.",
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const useHills = {
  name: 'Use Hills',
  param: 'use_hills',
  description:
    "A cyclist's desire to tackle hills in their routes. This is a range of values from 0 to 1, where 0 attempts to avoid hills and steep grades even if it means a longer (time and distance) path, while 1 indicates the rider does not fear hills and steeper grades. Based on the use_hills factor, penalties are applied to roads based on elevation change and grade. These penalties help the path avoid hilly roads in favor of flatter roads or less steep grades where available. Note that it is not always possible to find alternate paths to avoid hills (for example when route locations are in mountainous areas). The default value is 0.5.",
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const avoidBadSurfaces = {
  name: 'Avoid Bad Surface',
  param: 'avoid_bad_surfaces',
  description:
    'This value is meant to represent how much a cyclist wants to avoid roads with poor surfaces relative to the bicycle type being used. This is a range of values between 0 and 1. When the value is 0, there is no penalization of roads with different surface types; only bicycle speed on each surface is taken into account. As the value approaches 1, roads with poor surfaces for the bike are penalized heavier so that they are only taken if they significantly improve travel time. When the value is equal to 1, all bad surfaces are completely disallowed from routing, including start and end points. The default value is 0.25.',
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const topSpeed = {
  name: 'Top Speed',
  param: 'top_speed',
  description:
    'Top speed the vehicle can go. Also used to avoid roads with higher speeds than this value. top_speed must be between 10 and 252 KPH. The default value is 140 KPH.',
  unit: 'kmh',
  settings: {
    min: 10,
    max: 252,
    step: 5
  }
}

const usePrimary = {
  name: 'Use Primary',
  param: 'use_primary',
  description:
    "A riders's propensity to use primary roads. This is a range of values from 0 to 1, where 0 attempts to avoid primary roads, and 1 indicates the rider is more comfortable riding on primary roads. Based on the use_primary factor, roads with certain classifications and higher speeds are penalized in an attempt to avoid them when finding the best path. The default value is 0.5.",
  unit: 'willingness',
  settings: {
    min: 0,
    max: 1,
    step: 0.1
  }
}

const walkingSpeed = {
  name: 'Walking Speed',
  param: 'walking_speed',
  description:
    'Walking speed in kilometers per hour. Must be between 0.5 and 25 km/hr. Defaults to 5.1 km/hr (3.1 miles/hour).',
  unit: 'kmh',
  settings: {
    min: 0.5,
    max: 25,
    step: 0.1
  }
}

const walkwayFactor = {
  name: 'Walkway Factor',
  param: 'walkway_factor',
  description:
    'A factor that modifies the cost when encountering roads classified as footway (no motorized vehicles allowed), which may be designated footpaths or designated sidewalks along residential roads. Pedestrian routes generally attempt to favor using these walkways and sidewalks. The default walkway_factor is 1.0.',
  unit: 'factor',
  settings: {
    min: 1,
    max: 50,
    step: 1
  }
}

const sidewalkFactor = {
  name: 'Sidewalk Factor',
  param: 'sidewalk_factor',
  description:
    'A factor that modifies the cost when encountering roads with dedicated sidewalks. Pedestrian routes generally attempt to favor using sidewalks. The default sidewalk_factor is 1.0.',
  unit: 'factor',
  settings: {
    min: 1,
    max: 50,
    step: 1
  }
}

const alleyFactor = {
  name: 'Alley Factor',
  param: 'alley_factor',
  description:
    ' A factor that modifies (multiplies) the cost when alleys are encountered. Pedestrian routes generally want to avoid alleys or narrow service roads between buildings. The default alley_factor is 2.0.',
  unit: 'factor',
  settings: {
    min: 1,
    max: 50,
    step: 1
  }
}

const drivewayFactor = {
  name: 'Driveway Factor',
  param: 'driveway_factor',
  description:
    'A factor that modifies (multiplies) the cost when encountering a driveway, which is often a private, service road. Pedestrian routes generally want to avoid driveways (private). The default driveway factor is 5.0.',
  unit: 'factor',
  settings: {
    min: 1,
    max: 50,
    step: 1
  }
}

const stepPenalty = {
  name: 'Step Penalty',
  param: 'step_penalty',
  description:
    'A penalty in seconds added to each transition onto a path with steps or stairs. Higher values apply larger cost penalties to avoid paths that contain flights of steps.',
  unit: 'penalty',
  settings: {
    min: 0,
    max: 500,
    step: 5
  }
}

const maxHikingDifficulty = {
  name: 'Maximum Hiking Difficulty',
  param: 'max_hiking_difficulty',
  description:
    'This value indicates the maximum difficulty of hiking trails that is allowed. Values between 0 and 6 are allowed. The values correspond to sac_scale values within OpenStreetMap, see reference here. The default value is 1 which means that well cleared trails that are mostly flat or slightly sloped are allowed. Higher difficulty trails can be allowed by specifying a higher value for max_hiking_difficulty.',
  unit: 'difficulty',
  settings: {
    min: 0,
    max: 6,
    step: 1
  }
}

export const settingsInit = {
  maneuver_penalty: 5,
  country_crossing_penalty: 0,
  country_crossing_cost: 600,
  length: 21.5,
  width: 2.5,
  height: 4,
  weight: 21.77,
  axle_load: 9,
  hazmat: false,
  use_highways: 1,
  use_tolls: 1,
  use_ferry: 1,
  ferry_cost: 300,
  use_living_streets: 0.5,
  use_tracks: 0,
  private_access_penalty: 450,
  ignore_closures: false,
  closure_factor: 9,
  service_penalty: 15,
  service_factor: 1,
  exclude_unpaved: 1,
  shortest: false,
  exclude_cash_only_tolls: false,
  bicycle_type: 'Hybrid',
  cycling_speed: 20,
  use_roads: 0.5,
  use_hills: 0.5,
  avoid_bad_surfaces: 0.25,
  top_speed: 140,
  use_primary: 0.5,
  walking_speed: 5.1,
  walkway_factor: 1,
  sidewalk_factor: 1,
  alley_factor: 2,
  driveway_factor: 5,
  step_penalty: 0,
  max_hiking_difficulty: 1,
  exclude_polygons: []
}

export const profile_settings = {
  truck: {
    numeric: [
      length,
      width,
      weight,
      height,
      axleLoad,
      topSpeed,
      privateAccessPenalty,
      closureFactor,
      servicePenalty,
      serviceFactor
    ],
    boolean: [hazardousMaterials, shortest],
    enum: []
  },
  car: {
    numeric: [
      width,
      height,
      topSpeed,
      privateAccessPenalty,
      closureFactor,
      servicePenalty,
      serviceFactor
    ],
    boolean: [shortest],
    enum: []
  },
  bus: {
    numeric: [
      length,
      width,
      weight,
      height,
      topSpeed,
      privateAccessPenalty,
      closureFactor,
      servicePenalty,
      serviceFactor
    ],
    boolean: [shortest],
    enum: []
  },
  pedestrian: {
    numeric: [
      useHills,
      walkingSpeed,
      walkwayFactor,
      sidewalkFactor,
      alleyFactor,
      drivewayFactor,
      stepPenalty,
      maxHikingDifficulty
    ],
    boolean: [shortest],
    enum: []
  },
  motor_scooter: {
    numeric: [useHills, topSpeed, usePrimary],
    boolean: [shortest],
    enum: []
  },
  bicycle: {
    numeric: [cyclingSpeed, useRoads, useHills, avoidBadSurfaces],
    boolean: [shortest],
    enum: [bicycleType]
  }
}

export const settings_general = {
  truck: {
    numeric: [
      turnPenalityCost,
      countryCrossingPenality,
      countryCrossingCost,
      useHighways,
      useTollways,
      useFerry,
      ferryCost,
      useLivingStreets,
      useTracks,
      excludeUnpaved
    ],
    boolean: [ignoreClosures, excludeCashOnlyTolls],
    enum: []
  },
  car: {
    numeric: [
      turnPenalityCost,
      countryCrossingPenality,
      countryCrossingCost,
      useHighways,
      useTollways,
      useFerry,
      ferryCost,
      useLivingStreets,
      useTracks,
      excludeUnpaved
    ],
    boolean: [ignoreClosures, excludeCashOnlyTolls],
    enum: []
  },
  bus: {
    numeric: [
      turnPenalityCost,
      countryCrossingPenality,
      countryCrossingCost,
      useHighways,
      useTollways,
      useFerry,
      ferryCost,
      useTracks,
      excludeUnpaved
    ],
    boolean: [ignoreClosures, excludeCashOnlyTolls],
    enum: []
  },
  pedestrian: {
    numeric: [useFerry, servicePenalty, serviceFactor],
    boolean: [],
    enum: []
  },
  motor_scooter: {
    numeric: [useFerry, useTracks],
    boolean: [],
    enum: []
  },
  bicycle: {
    numeric: [
      useFerry,
      useLivingStreets,
      countryCrossingCost,
      countryCrossingPenality,
      turnPenalityCost,
      servicePenalty,
      serviceFactor
    ],
    boolean: [],
    enum: []
  }
}
