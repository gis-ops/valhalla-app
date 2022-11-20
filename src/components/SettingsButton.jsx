import { Button, Popup, Icon } from 'semantic-ui-react'

export const SettingsButton = ({ handleSettings }) => {
  return (
    <Popup
      content={'Show/hide settings'}
      trigger={
        <Button tertiary icon onClick={() => handleSettings()}>
          <Icon name="cogs" />{' '}
        </Button>
      }
    />
  )
}
