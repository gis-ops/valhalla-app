import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popup, Icon } from 'semantic-ui-react'

export const Settings = ({
  handleAddWaypoint,
  handleRemoveWaypoints,
  handleSettings,
}) => (
  <div>
    <Popup
      content={'Reset waypoints'}
      size={'tiny'}
      trigger={
        <Button basic size="tiny" icon onClick={() => handleRemoveWaypoints()}>
          <Icon name="trash" />
        </Button>
      }
    />
    <Popup
      content={'Add waypoint'}
      size={'tiny'}
      trigger={
        <Button basic size="tiny" icon onClick={() => handleAddWaypoint()}>
          <Icon name="plus" />
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
Settings.propTypes = {
  handleAddWaypoint: PropTypes.func,
  handleRemoveWaypoints: PropTypes.func,
  handleSettings: PropTypes.func,
  group: PropTypes.string,
}
