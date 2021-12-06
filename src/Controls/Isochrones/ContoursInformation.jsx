import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { showProvider } from '../../actions/isochronesActions'

class ContoursInformation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    results: PropTypes.object,
    header: PropTypes.string,
    provider: PropTypes.string,
    profile: PropTypes.string
  }

  handleChange = (data, event) => {
    const { dispatch } = this.props
    dispatch(showProvider(event.provider, event.checked))
  }

  render() {
    const { provider, results } = this.props

    const { features } = results[provider].data

    return (
      <React.Fragment>
        {features ? (
          features.map((feature, key) => {
            return (
              <div className={'flex justify-between pb2'} key={key}>
                <div
                  className={'flex'}
                  style={{ alignSelf: 'center', flexBasis: '120px' }}>
                  <Icon circular name={'time'} />
                  <div className={'pr2 f6 b pt1 pb1'}>
                    {feature.properties.contour + ' minutes'}
                  </div>
                </div>
                <div
                  className={'flex'}
                  style={{ alignSelf: 'center', marginLeft: 'auto' }}>
                  <Icon circular name={'move'} />
                  <div className={'pa1 b f6'}>
                    {feature.properties.area.toFixed(0) + ' km²'}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div>No isochrones found</div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { results } = state.isochrones
  return {
    results
  }
}

export default connect(mapStateToProps)(ContoursInformation)
