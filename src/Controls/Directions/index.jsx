import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'

import Waypoints from './Waypoints'

import { ProfilePicker } from 'components/profile-picker'
import { SettingsButton } from 'components/SettingsButton'
import { SettingsFooter } from 'components/SettingsFooter'
import { Settings } from './settings'

import {
  doAddWaypoint,
  doRemoveWaypoint,
  makeRequest,
  clearRoutes,
} from 'actions/directionsActions'
import {
  updateProfile,
  doShowSettings,
  updatePermalink,
  resetSettings,
} from 'actions/commonActions'

class DirectionsControl extends React.Component {
  static propTypes = {
    profile: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }

  handleUpdateProfile = (event, data) => {
    const { dispatch } = this.props
    dispatch(updateProfile({ profile: data.valhalla_profile }))
    dispatch(resetSettings())
    dispatch(updatePermalink())
  }

  handleAddWaypoint = (event, data) => {
    const { dispatch } = this.props
    dispatch(doAddWaypoint())
  }

  handleRemoveWaypoints = () => {
    const { dispatch } = this.props
    dispatch(doRemoveWaypoint())
    dispatch(clearRoutes())
  }

  componentDidUpdate = (prevProps) => {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (this.props.profile !== nextProps.profile) {
      dispatch(makeRequest())
    }
  }

  handleSettings = () => {
    const { dispatch } = this.props
    dispatch(doShowSettings())
  }

  render() {
    const { profile, loading } = this.props
    return (
      <React.Fragment>
        <div className="flex flex-column content-between">
          <div>
            <div className="pa2 flex flex-row justify-between">
              <ProfilePicker
                group={'directions'}
                profiles={[
                  'bicycle',
                  'pedestrian',
                  'car',
                  'truck',
                  'bus',
                  'motor_scooter',
                  'motorcycle',
                ]}
                loading={loading}
                popupContent={[
                  'Bicycle',
                  'Pedestrian',
                  'Car',
                  'Truck',
                  'Bus',
                  'Motor Scooter',
                  'Motorcycle',
                ]}
                activeProfile={profile}
                handleUpdateProfile={this.handleUpdateProfile}
              />
              <SettingsButton handleSettings={this.handleSettings} />
            </div>
            <div className="flex flex-wrap justify-between">
              <Waypoints />
            </div>
            <div className="pa2 flex flex-wrap justify-between">
              <Settings
                handleAddWaypoint={this.handleAddWaypoint}
                handleRemoveWaypoints={this.handleRemoveWaypoints}
              />
            </div>
          </div>
          <Divider fitted />
          <SettingsFooter />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { profile, loading } = state.common
  return {
    profile,
    loading,
  }
}

export default connect(mapStateToProps)(DirectionsControl)
