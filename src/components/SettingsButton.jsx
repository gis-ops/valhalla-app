import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popup, Icon } from 'semantic-ui-react'

export const SettingsButton = ({ handleSettings }) => {
  return (
    <Popup
      content={'Show/hide settings'}
      trigger={
        <Button tertiary="true" icon onClick={() => handleSettings()}>
          <Icon name="cogs" />{' '}
        </Button>
      }
    />
  )
}

SettingsButton.propTypes = {
  handleSettings: PropTypes.func,
}
