import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { Search, Form, Popup, Icon, Label, Accordion } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'

import {
  updateTextInput,
  updateIsoSettings,
  fetchGeocode,
  makeIsochronesRequest
} from 'actions/isochronesActions'
import { debounce } from 'throttle-debounce'

class Waypoints extends Component {
  static propTypes = {
    isochrones: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.fetchGeocodeResults = debounce(200, this.fetchGeocodeResults)
    this.handleIsoSliderUpdateSettings = debounce(
      100,
      this.handleIsoSliderUpdateSettings
    )
  }

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleSearchChange = (event, { value }) => {
    const { dispatch } = this.props
    dispatch(updateTextInput({ userInput: value }))
    this.fetchGeocodeResults()
  }

  fetchGeocodeResults() {
    const { dispatch } = this.props
    const { userInput } = this.props.isochrones

    if (userInput.length > 0) {
      dispatch(fetchGeocode(userInput))
    }
  }

  // we really only want to call the valhalla backend if settings have changed
  // therefor using rambda for deep object comparison
  UNSAFE_componentWillUpdate(nextProps) {
    const { dispatch } = this.props
    const { maxRange, interval } = this.props.isochrones
    const nextMaxRange = nextProps.isochrones.maxRange
    const nextInterval = nextProps.isochrones.interval
    if (
      !R.equals(maxRange, nextMaxRange) ||
      !R.equals(interval, nextInterval)
    ) {
      dispatch(makeIsochronesRequest())
    }
  }

  handleResultSelect = (e, { result }) => {
    const { dispatch } = this.props
    dispatch(
      updateTextInput({
        userInput: result.title,
        addressindex: result.addressindex
      })
    )
    dispatch(makeIsochronesRequest())
  }

  handleIntervalChange = (e, { value }) => {
    const { maxRange } = this.props.isochrones

    value = isNaN(parseInt(value)) ? 0 : parseInt(value)
    if (value > maxRange) {
      value = maxRange
    }

    const intervalName = 'interval'

    this.handleIsoSliderUpdateSettings({
      intervalName,
      value
    })
  }

  handleRangeChange = (e, { value }) => {
    value = isNaN(parseInt(value)) ? 0 : parseInt(value)
    if (value > 120) {
      value = 120
    }

    const maxRangeName = 'maxRange'
    const intervalName = 'interval'

    this.handleIsoSliderUpdateSettings({
      maxRangeName,
      intervalName,
      value
    })
  }

  handleIsoSliderUpdateSettings = ({ value, maxRangeName, intervalName }) => {
    const { dispatch } = this.props

    // maxRangeName can be undefined if interval is being updated
    dispatch(
      updateIsoSettings({
        maxRangeName,
        intervalName,
        value: parseInt(value)
      })
    )
  }

  render() {
    const {
      isFetching,
      geocodeResults,
      userInput,
      maxRange,
      interval
    } = this.props.isochrones
    const { activeIndex } = this.state

    const controlSettings = {
      maxRange: {
        name: 'Maximum Range',
        param: 'maxRange',
        description: 'The maximum range in minutes',
        unit: 'mins',
        settings: {
          min: 1,
          max: 120,
          step: 1
        }
      },
      interval: {
        name: 'Interval Step',
        param: 'interval',
        description: 'The interval length in minutes.',
        unit: 'mins',
        settings: {
          min: 1,
          max: maxRange,
          step: 1
        }
      }
    }

    return (
      <div>
        <Search
          className={'pt2 pl3'}
          size="small"
          input={{ icon: 'search', iconPosition: 'left' }}
          onSearchChange={this.handleSearchChange}
          onResultSelect={this.handleResultSelect}
          type="text"
          minCharacters={3}
          loading={isFetching}
          results={geocodeResults}
          value={userInput}
          placeholder="Find address ..."
        />
        <div className="pa2">
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}>
              <Icon name="dropdown" />
              <span className="f5">Settings</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Form size={'small'}>
                <div className={'pt3 pl3'}>
                  <Form.Group inline>
                    <Form.Input
                      width={12}
                      size="small"
                      label={
                        <div className="flex flex-row align-top">
                          <span className="custom-label">
                            {controlSettings.maxRange.name}
                          </span>
                          <Popup
                            content={controlSettings.maxRange.description}
                            size={'tiny'}
                            trigger={
                              <Icon
                                className="pl2"
                                color="grey"
                                name="help circle"
                              />
                            }
                          />
                        </div>
                      }
                      value={maxRange}
                      placeholder="Enter Value"
                      name={controlSettings.maxRange.param}
                      onChange={this.handleRangeChange}
                    />
                    <Popup
                      content={'Units'}
                      size={'tiny'}
                      trigger={
                        <Label
                          basic
                          size={'small'}
                          style={{ cursor: 'default' }}>
                          {controlSettings.maxRange.unit}
                        </Label>
                      }
                    />
                  </Form.Group>
                  <div className={'mb2 pa2'}>
                    <Slider
                      discrete
                      color="grey"
                      value={maxRange}
                      settings={{
                        min: controlSettings.maxRange.settings.min,
                        max: controlSettings.maxRange.settings.max,
                        step: controlSettings.maxRange.settings.step,
                        start: maxRange,
                        onChange: value => {
                          const maxRangeName = controlSettings.maxRange.param
                          const intervalName = controlSettings.interval.param

                          this.handleIsoSliderUpdateSettings({
                            maxRangeName,
                            intervalName,
                            value
                          })
                        }
                      }}
                    />
                  </div>
                </div>
                <div className={'pt3 pl3'}>
                  <Form.Group inline>
                    <Form.Input
                      width={12}
                      size="small"
                      label={
                        <div className="flex flex-row align-top">
                          <span className="custom-label">
                            {controlSettings.interval.name}
                          </span>
                          <Popup
                            content={controlSettings.interval.description}
                            size={'tiny'}
                            trigger={
                              <Icon
                                className="pl2"
                                color="grey"
                                name="help circle"
                              />
                            }
                          />
                        </div>
                      }
                      value={interval}
                      placeholder="Enter Value"
                      name={controlSettings.interval.param}
                      onChange={this.handleIntervalChange}
                    />
                    <Popup
                      content={'Units'}
                      size={'tiny'}
                      trigger={
                        <Label
                          basic
                          size={'small'}
                          style={{ cursor: 'default' }}>
                          {controlSettings.interval.unit}
                        </Label>
                      }
                    />
                  </Form.Group>
                  <div className={'mb2 pa2'}>
                    <Slider
                      discrete
                      color="grey"
                      value={interval}
                      settings={{
                        min: controlSettings.interval.settings.min,
                        max: maxRange,
                        step: controlSettings.interval.settings.step,
                        start: interval,
                        onChange: value => {
                          const intervalName = controlSettings.interval.param

                          this.handleIsoSliderUpdateSettings({
                            intervalName,
                            value
                          })
                        }
                      }}
                    />
                  </div>
                </div>
              </Form>
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isochrones } = state
  return {
    isochrones
  }
}

export default connect(mapStateToProps)(Waypoints)
