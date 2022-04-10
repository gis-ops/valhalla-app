import React, { Fragment } from 'react'
import { Form, Label, Popup } from 'semantic-ui-react'
import { Slider } from '@mui/material'

import PropTypes from 'prop-types'

const CustomSlider = props => {
  const { settings, option, handleUpdateSettings } = props
  const { min, max, step } = option.settings

  const handleChange = (e, { value }) => {
    handleUpdateSettings({
      name: option.param,
      value: parseFloat(value)
    })
  }

  return (
    <Fragment>
      <Form.Group inline>
        <Form.Input
          width={16}
          size="small"
          value={settings[option.param]}
          placeholder="Enter Value"
          name={option.param}
          onChange={handleChange}
        />
        <Popup
          content={'Units'}
          size={'tiny'}
          trigger={
            <Label basic size={'small'} style={{ cursor: 'default' }}>
              {option.unit}
            </Label>
          }
        />
      </Form.Group>
      <div>
        <Slider
          min={min}
          size={'small'}
          max={max}
          step={step}
          value={settings[option.param]}
          color="secondary"
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={e => {
            handleUpdateSettings({
              name: option.param,
              value: parseFloat(e.target.value)
            })
          }}
        />
      </div>
    </Fragment>
  )
}

CustomSlider.propTypes = {
  option: PropTypes.object,
  settings: PropTypes.object,
  handleUpdateSettings: PropTypes.func
}

export default CustomSlider
