import React from 'react'
import PropTypes from 'prop-types'
import { Button, Popup } from 'semantic-ui-react'

import { ReactComponent as BusSvg } from './bus.svg'
import { ReactComponent as ScooterSvg } from './scooter.svg'
import { ReactComponent as CarSvg } from './car.svg'
import { ReactComponent as TruckSvg } from './truck.svg'
import { ReactComponent as BikeSvg } from './bike.svg'
import { ReactComponent as PedestrianSvg } from './pedestrian.svg'

const iconMap = {
  truck: <TruckSvg />,
  car: <CarSvg />,
  bicycle: <BikeSvg />,
  pedestrian: <PedestrianSvg />,
  motor_scooter: <ScooterSvg />,
  bus: <BusSvg />
}

export const ProfilePicker = ({
  group,
  loading,
  popupContent,
  profiles,
  activeProfile,
  handleUpdateProfile
}) => (
  <Button.Group basic size="small" style={{ height: '40px' }}>
    {profiles.map((profile, i) => (
      <Popup
        key={i}
        content={popupContent[i]}
        size={'small'}
        trigger={
          <Button
            active={profile === activeProfile}
            loading={profile === activeProfile ? loading : false}
            content={iconMap[profile]}
            name={'profile'}
            valhalla_profile={profile}
            group={group}
            style={{ padding: '.5em' }}
            onClick={handleUpdateProfile}
          />
        }
      />
    ))}
  </Button.Group>
)
ProfilePicker.propTypes = {
  profiles: PropTypes.array,
  loading: PropTypes.bool,
  activeProfile: PropTypes.string,
  handleUpdateProfile: PropTypes.func,
  group: PropTypes.string,
  popupContent: PropTypes.string
}
