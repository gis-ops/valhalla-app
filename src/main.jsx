import App from './App'
import React from 'react'
import { render } from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

import './index.css'
import 'semantic-ui-css/semantic.css'
import 'leaflet/dist/leaflet.css'
import 'tachyons/css/tachyons.css'
import 'react-toastify/dist/ReactToastify.css'
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

const container = document.getElementById('valhalla-app-root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
)
