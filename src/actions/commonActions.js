import {
  MESSAGE_HANDLER,
  UPDATE_PROFILE,
  UPDATE_SETTINGS,
  UPDATE_TAB,
  LOADING,
  SHOW_SETTINGS
} from './types'

import {
  profile_settings,
  settings_general
} from '../Controls/settings-options'

export const showLoading = loading => ({
  type: LOADING,
  payload: loading
})
export const sendMessage = message_object => ({
  type: MESSAGE_HANDLER,
  payload: {
    receivedAt: Date.now(),
    ...message_object
  }
})
export const updateSettings = object => ({
  type: UPDATE_SETTINGS,
  payload: object
})
export const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  payload: profile
})
export const updateTab = activeTab => ({
  type: UPDATE_TAB,
  payload: activeTab
})

export const doShowSettings = () => ({
  type: SHOW_SETTINGS
})

export const filterProfileSettings = (profile, settings) => {

  const filteredSettings = {
    exclude_polygons: settings.exclude_polygons
  }
  for (const setting in settings) {
    for (const item of settings_general[profile].numeric) {
      if (setting == item.param) {
        filteredSettings[setting] = settings[setting]
      }
    }
    for (const item of settings_general[profile].boolean) {
      if (setting == item.param) {
        filteredSettings[setting] = settings[setting]
      }
    }
    for (const item of settings_general[profile].enum) {
      if (setting == item.param) {
        filteredSettings[setting] = settings[setting]
      }
    }

    for (const item of profile_settings[profile].numeric) {
      if (setting == item.param) {
        filteredSettings[setting] = settings[setting]
      }
    }

    for (const item of profile_settings[profile].boolean) {
      if (setting == item.param) {
        filteredSettings[setting] = settings[setting]
      }
    }
    for (const item of profile_settings[profile].enum) {
      if (setting == item.param) {
        filteredSettings[setting] = settings[setting]
      }
    }
  }

  return filteredSettings
}
