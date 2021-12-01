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
  profile: 'car',
  settings: {
    maneuver_penalty: 5,
    country_crossing_penalty: 0,
    length: 21.5,
    width: 2.5,
    height: 4,
    weight: 21.77,
    axle_load: 9,
    hazmat: false,
    use_highways: 1,
    use_tolls: 1
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
