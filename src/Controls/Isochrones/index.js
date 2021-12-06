import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Divider } from 'semantic-ui-react'

import Waypoints from './Waypoints'

import { ProfilePicker } from '../../components/profile-picker'
import { Settings } from './settings'

import fossgisLogo from 'images/fossgis.png'
import { updateProfile, doShowSettings } from 'actions/commonActions'
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
          <div className="tr">
            <a href={`https:/fossgis.de`}>
              <img
                src={fossgisLogo}
                style={{ height: 40 }}
                className={'pa2'}
                alt="gisops_logo"
              />
            </a>
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
