import React, { Fragment } from 'react'
import { Form, Label, Popup } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
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

  const sliderSettings = {
    start: settings[option.param],
    min: min,
    max: max,
    step: step,
    onChange: value => {
      handleUpdateSettings({
        name: option.param,
        value: parseFloat(value)
      })
    }
  }

  return (
    <Fragment>
      <Form.Group inline>
        <Form.Input
          width={16}
          size="small"
          // label={
          //   <div className="flex flex-row align-top">
          //     <span className="custom-label">{option.name}</span>
          //     <Popup
          //       content={option.description}
          //       size={'tiny'}
          //       trigger={
          //         <Icon className="pl2" color="grey" name="help circle" />
          //       }
          //     />
          //   </div>
          // }
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
      <div className={'mb2'}>
        <Slider
          discrete
          color="grey"
          value={settings[option.param]}
          settings={sliderSettings}
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
