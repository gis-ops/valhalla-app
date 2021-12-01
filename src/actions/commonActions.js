import {
  MESSAGE_HANDLER,
  UPDATE_PROFILE,
  UPDATE_SETTINGS,
  UPDATE_TAB,
  LOADING,
  SHOW_SETTINGS
} from './types'

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
