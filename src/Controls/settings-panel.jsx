import React, { Fragment } from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { debounce } from 'throttle-debounce'
import {
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Popup,
  Segment,
  Accordion,
  Dropdown
} from 'semantic-ui-react'
import { profile_settings, settings_general } from './settings-options'
import { updateSettings, doShowSettings } from 'actions/commonActions'
import CustomSlider from '../components/CustomSlider'
import { makeRequest } from 'actions/directionsActions'
import { makeIsochronesRequest } from 'actions/isochronesActions'

const Checkbox = props => {
  const { settings, option, dispatch } = props

  const handleChange = (e, { checked }) => {
    let value = checked ? 1.0 : 0.0
    if (option.param === 'hazmat') {
      value = checked
    }
    dispatch(
      updateSettings({
        name: option.param,
        value
      })
    )
  }

  return (
    <Fragment>
      <Form.Checkbox
        width={10}
        label={option.name}
        checked={settings[option.param]}
        placeholder="Enter Value"
        onChange={handleChange}
      />
    </Fragment>
  )
}

Checkbox.propTypes = {
  option: PropTypes.object,
  settings: PropTypes.object,
  dispatch: PropTypes.func
}

class SettingsPanel extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    activeTab: PropTypes.number,
    message: PropTypes.object,
    profile: PropTypes.string,
    settings: PropTypes.object,
    showSettings: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleUpdateSettings = debounce(100, this.handleUpdateSettings)
    this.state = {
      activeIndexProfile: 0,
      activeIndexGeneral: 0,
      generalSettings: {},
      extraSettings: {}
    }
  }

  handleUpdateSettings = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(
      updateSettings({
        name,
        value
      })
    )
  }

  // the react slider will update the settings twice
  // we however only want this component to update if the
  // settings really change, therefor deep check with ramda
  shouldComponentUpdate(nextProps, nextState) {
    const { settings, profile, showSettings } = this.props

    if (!R.equals(settings, nextProps.settings)) {
      return true
    }
    if (!R.equals(profile, nextProps.profile)) {
      return true
    }
    if (!R.equals(showSettings, nextProps.showSettings)) {
      return true
    }
    if (!R.equals(this.state, nextState)) {
      return true
    }
    return false
  }
  // we really only want to call the valhalla backend if settings have changed
  // therefor using rambda for deep object comparison
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, settings, activeTab, profile } = this.props

    if (!R.equals(profile, nextProps.profile)) {
      const { generalSettings } = this.state
      Object.keys(generalSettings).forEach(v => (generalSettings[v] = false))

      const { extraSettings } = this.state
      Object.keys(extraSettings).forEach(v => (extraSettings[v] = false))

      this.setState({ generalSettings, extraSettings })
    }

    if (!R.equals(settings, nextProps.settings)) {
      activeTab == 0
        ? dispatch(makeRequest())
        : dispatch(makeIsochronesRequest())
    }
  }

  handleShowSettings = (settingsType, i) => {
    const settings = { ...this.state[settingsType] }
    settings[i] = !settings[i]
    this.setState({ [settingsType]: settings })
  }

  handleBikeTypeChange = (e, data) => {
    const { value, name } = data
    const { dispatch } = this.props
    dispatch(
      updateSettings({
        name,
        value
      })
    )
  }

  render() {
    const { dispatch, profile, settings, showSettings } = this.props

    const no_profile_settings = profile_settings[profile].boolean.length === 0
    const width = no_profile_settings ? 170 : 340

    console.log(settings)

    return (
      <React.Fragment>
        {showSettings ? (
          <Segment
            style={{
              width: width,
              zIndex: 999,
              position: 'absolute',
              right: 60,
              top: -5
            }}>
            <Grid columns={16} divided>
              <Grid.Row>
                {!no_profile_settings && (
                  <Grid.Column width={8}>
                    <Form size={'small'}>
                      <Header as="h4">Extra Settings</Header>
                      {profile_settings[profile].numeric.map((option, key) => (
                        <Fragment key={key}>
                          <div className="flex pointer">
                            <Icon
                              name={
                                this.state.extraSettings[key]
                                  ? 'caret down'
                                  : 'caret right'
                              }
                            />
                            <span
                              className="b f6"
                              onClick={() =>
                                this.handleShowSettings('extraSettings', key)
                              }>
                              {option.name}
                            </span>
                            <div style={{ marginLeft: 'auto' }}>
                              <Popup
                                content={option.description}
                                size={'tiny'}
                                trigger={
                                  <Icon color="grey" name="help circle" />
                                }
                              />
                            </div>
                          </div>
                          {this.state.extraSettings[key] ? (
                            <CustomSlider
                              key={key}
                              option={option}
                              dispatch={dispatch}
                              settings={settings}
                              handleUpdateSettings={this.handleUpdateSettings}
                            />
                          ) : null}
                        </Fragment>
                      ))}
                      <Divider />
                      <Fragment>
                        {profile_settings[profile].boolean.map(
                          (option, key) => {
                            return (
                              <div key={key} className="flex">
                                <Checkbox
                                  option={option}
                                  dispatch={dispatch}
                                  settings={settings}
                                />
                                <div style={{ marginLeft: 'auto' }}>
                                  <Popup
                                    content={option.description}
                                    size={'tiny'}
                                    trigger={
                                      <Icon color="grey" name="help circle" />
                                    }
                                  />
                                </div>
                              </div>
                            )
                          }
                        )}
                      </Fragment>
                      <Divider />
                      <Fragment>
                        {profile_settings[profile].enum.map((option, key) => {
                          return (
                            <div key={key} className="flex">
                              <Dropdown
                                placeholder="Select Bicycle Type"
                                fluid
                                onChange={this.handleBikeTypeChange}
                                value={settings.bicycle_type}
                                selection
                                name={'bicycle_type'}
                                options={option.param}
                              />

                              <div style={{ marginLeft: 'auto' }}>
                                <Popup
                                  content={option.description}
                                  size={'tiny'}
                                  trigger={
                                    <Icon color="grey" name="help circle" />
                                  }
                                />
                              </div>
                            </div>
                          )
                        })}
                      </Fragment>
                    </Form>
                  </Grid.Column>
                )}
                <Grid.Column width={no_profile_settings ? 16 : 8}>
                  <Form size={'small'}>
                    <div className={'flex flex-row justify-between'}>
                      <Header as="h4">General Settings</Header>
                      <Icon
                        style={{ cursor: 'pointer' }}
                        name="remove circle"
                        onClick={() => dispatch(doShowSettings())}
                      />
                    </div>
                    <Accordion>
                      {settings_general[profile].numeric.map((option, key) => (
                        <Fragment key={key}>
                          <div className="flex pointer">
                            <Icon
                              name={
                                this.state.generalSettings[key]
                                  ? 'caret down'
                                  : 'caret right'
                              }
                            />
                            <span
                              className="b f6"
                              onClick={() =>
                                this.handleShowSettings('generalSettings', key)
                              }>
                              {option.name}
                            </span>
                            <div style={{ marginLeft: 'auto' }}>
                              <Popup
                                content={option.description}
                                size={'tiny'}
                                trigger={
                                  <Icon color="grey" name="help circle" />
                                }
                              />
                            </div>
                          </div>
                          {this.state.generalSettings[key] ? (
                            <CustomSlider
                              key={key}
                              option={option}
                              dispatch={dispatch}
                              settings={settings}
                              handleUpdateSettings={this.handleUpdateSettings}
                            />
                          ) : null}
                        </Fragment>
                      ))}
                    </Accordion>
                    <Divider />
                    {settings_general[profile].boolean.map((option, key) => {
                      return (
                        <div key={key} className="flex">
                          <Checkbox
                            key={key}
                            option={option}
                            dispatch={dispatch}
                            settings={settings}
                          />
                          <div style={{ marginLeft: 'auto' }}>
                            <Popup
                              content={option.description}
                              size={'tiny'}
                              trigger={<Icon color="grey" name="help circle" />}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ) : (
          ''
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { message, profile, settings, activeTab, showSettings } = state.common
  return {
    showSettings,
    message,
    profile,
    settings,
    activeTab
  }
}

export default connect(mapStateToProps)(SettingsPanel)
