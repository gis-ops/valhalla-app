export const profile_settings = {
  truck: {
    numeric: [
      {
        name: 'Length',
        param: 'length',
        unit: 'm',
        description: 'The length of the vehicle',
        settings: {
          min: 1.0,
          max: 50.0,
          step: 0.5
        }
      },
      {
        name: 'Width',
        param: 'width',
        unit: 'm',
        description: 'The width of the vehicle',
        settings: {
          min: 1.0,
          max: 10,
          step: 0.5
        }
      },
      {
        name: 'Weight',
        param: 'weight',
        unit: 'tons',
        description: 'The weight of the vehicle',
        settings: {
          min: 1,
          max: 100,
          step: 1
        }
      },
      {
        name: 'Height',
        param: 'height',
        unit: 'm',
        description: 'The height of the vehicle',
        settings: {
          min: 1,
          max: 10,
          step: 0.5
        }
      },
      {
        name: 'Axle Load',
        param: 'axle_load',
        description: 'The axle load of the vehicle',
        unit: 'tons',
        settings: {
          min: 1,
          max: 50,
          step: 1
        }
      }
    ],
    boolean: [
      {
        name: 'Hazardous materials',
        description: 'Whether the vehicle is carrying hazardous materials',
        param: 'hazmat'
      }
    ]
  },
  car: {
    numeric: [],
    boolean: []
  },
  pedestrian: {
    numeric: [],
    boolean: []
  },
  motor_scooter: {
    numeric: [],
    boolean: []
  },
  bicycle: {
    numeric: [],
    boolean: []
  },
  bus: {
    numeric: [],
    boolean: []
  }
}

export const settings_general = {
  numeric: [
    {
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
    },
    {
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
  ],
  boolean: [
    {
      name: 'Use Highways',
      param: 'use_highways',
      description:
        'This value indicates the willingness to take highways. Checking this will favor highways whilse unchecking it will try to avoid highways. Note that sometimes highways are required to complete a route so unchecking this does not guarantee to avoid highways entirely.'
    },
    {
      name: 'Use Tollways',
      param: 'use_tolls',
      description:
        'This value indicates the willingness to take roads with tolls. Checking this option will not attempt to avoid them whilst unchecking this will attempt to avoid toll ways. Note that sometimes roads with tolls are required to complete a route so values of 0 are not guaranteed to avoid them entirely.'
    }
  ]
}
