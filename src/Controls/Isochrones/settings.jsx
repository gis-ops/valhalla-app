import React from 'react'
import { Button, Popup, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export const Settings = ({ handleRemoveIsos, handleSettings }) => {
  return (
    <div>
      <Popup
        content={'Reset waypoints'}
        size={'tiny'}
        trigger={
          <Button basic size="tiny" icon onClick={() => handleRemoveIsos()}>
            <Icon name="trash" />
          </Button>
        }
      />
      <Popup
        content={'Show/hide settings'}
        size={'tiny'}
        trigger={
          <Button basic size="tiny" icon onClick={() => handleSettings()}>
            <Icon name="cogs" />
          </Button>
        }
      />
    </div>
  )
}

Settings.propTypes = {
  handleRemoveIsos: PropTypes.func,
  handleSettings: PropTypes.func
}
