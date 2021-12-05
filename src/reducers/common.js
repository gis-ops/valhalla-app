import {
  UPDATE_SETTINGS,
  UPDATE_PROFILE,
  UPDATE_TAB,
  LOADING,
  MESSAGE_HANDLER,
  SHOW_SETTINGS
} from 'actions/types'

const initialState = {
  activeTab: 0,
  showSettings: true,
  loading: false,
  message: {
    receivedAt: 0,
    type: null,
    icon: null,
    topic: null,
    description: null
  },
  profile: 'bicycle',
  settings: {
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
}

export const common = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_HANDLER: {
      return {
        ...state,
        message: action.payload
      }
    }
    case LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case SHOW_SETTINGS: {
      return {
        ...state,
        showSettings: !state.showSettings
      }
    }

    case UPDATE_SETTINGS: {
      const { name, value } = action.payload
      return {
        ...state,
        settings: {
          ...state.settings,
          [name]: value
        }
      }
    }

    case UPDATE_TAB: {
      const { activeTab } = action.payload
      return {
        ...state,
        activeTab
      }
    }

    case UPDATE_PROFILE: {
      const { profile } = action.payload
      return {
        ...state,
        profile
      }
    }

    default: {
      return state
    }
  }
}
