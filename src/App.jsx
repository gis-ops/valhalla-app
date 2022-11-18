import React from 'react'

import Map from './Map/Map'
import MainControl from './Controls'
import SettingsPanel from './Controls/settings-panel'

class App extends React.Component {
  render() {
    return (
      <div>
        <Map />
        <MainControl />
        <SettingsPanel />
      </div>
    )
  }
}

export default App
