import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'

import Waypoints from './Waypoints'

import { ProfilePicker } from '../../components/profile-picker'
import { SettingsButton } from '../../components/SettingsButton'
import { SettingsFooter } from 'components/SettingsFooter'

import {
  updateProfile,
  doShowSettings,
  updatePermalink,
  resetSettings,
} from 'actions/commonActions'
import { clearIsos, makeIsochronesRequest } from 'actions/isochronesActions'

class IsochronesControl extends React.Component {
  static propTypes = {
    profile: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  }

  handleUpdateProfile = (event, data) => {
    const { dispatch } = this.props
    dispatch(updateProfile({ profile: data.valhalla_profile }))
    dispatch(resetSettings())
    dispatch(updatePermalink())
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (this.props.profile !== nextProps.profile) {
      dispatch(makeIsochronesRequest())
    }
  }

  handleRemoveIsos = () => {
    const { dispatch } = this.props
    dispatch(clearIsos())
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
          <div className="pa2 flex flex-row justify-between">
            <ProfilePicker
              group={'directions'}
              loading={loading}
              profiles={[
                'bicycle',
                'pedestrian',
                'car',
                'truck',
                'bus',
                'motor_scooter',
              ]}
              popupContent={[
                'Bicycle',
                'Pedestrian',
                'Car',
                'Truck',
                'Bus',
                'Motor Scooter',
              ]}
              activeProfile={profile}
              handleUpdateProfile={this.handleUpdateProfile}
            />
            <SettingsButton handleSettings={this.handleSettings} />
          </div>
          <Waypoints />
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

export default connect(mapStateToProps)(IsochronesControl)
