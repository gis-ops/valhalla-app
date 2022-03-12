import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'

import Waypoints from './Waypoints'

import { ProfilePicker } from '../../components/profile-picker'
import { Settings } from './settings'

import {
  updateProfile,
  doShowSettings,
  updatePermalink
} from 'actions/commonActions'
import { clearIsos, makeIsochronesRequest } from 'actions/isochronesActions'

class IsochronesControl extends React.Component {
  static propTypes = {
    profile: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  handleUpdateProfile = (event, data) => {
    const { dispatch } = this.props
    dispatch(updateProfile({ profile: data.valhalla_profile }))
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
          <div className="pa3 flex flex-row justify-between">
            <ProfilePicker
              group={'directions'}
              loading={loading}
              profiles={[
                'bicycle',
                'pedestrian',
                'car',
                'truck',
                'bus',
                'motor_scooter'
              ]}
              popupContent={[
                'bicycle',
                'pedestrian',
                'car',
                'truck',
                'bus',
                'motor scooter'
              ]}
              activeProfile={profile}
              handleUpdateProfile={this.handleUpdateProfile}
            />
            <Settings
              handleRemoveIsos={this.handleRemoveIsos}
              handleSettings={this.handleSettings}
            />
          </div>
          <Waypoints />
          <Divider fitted />
          <div className="ml2">
            <span className="custom-label">
              Calculations by{' '}
              <a
                href="https://github.com/valhalla/valhalla"
                target="_blank"
                rel="noreferrer">
                Valhalla
              </a>{' '}
              • visualized with{' '}
              <a
                href="https://github.com/gis-ops/valhalla-app/"
                target="_blank"
                rel="noreferrer">
                Valhalla App
              </a>
            </span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { profile, loading } = state.common
  return {
    profile,
    loading
  }
}

export default connect(mapStateToProps)(IsochronesControl)
