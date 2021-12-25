import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Icon, Checkbox } from 'semantic-ui-react'
import { showProvider } from '../../actions/directionsActions'

class Summary extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    results: PropTypes.object,
    header: PropTypes.string,
    provider: PropTypes.string
  }

  handleChange = (event, data) => {
    const { dispatch } = this.props
    dispatch(showProvider(data.provider, data.checked))
  }

  formatDuration = durationInSeconds => {
    const date = new Date(durationInSeconds * 1000)
    const days = date.getDate() - 1 > 0 ? date.getDate() - 1 + 'd ' : ''
    const hours = date.getHours() > 0 ? date.getHours() + 'h ' : ''
    const minutes = date.getMinutes() > 0 ? date.getMinutes() + 'min' : ''
    return days + hours + minutes
  }

  render() {
    const { provider, results } = this.props

    const summary = R.path([provider, 'data', 'trip', 'summary'], results)

    return (
      <React.Fragment>
        {summary ? (
          <React.Fragment>
            <div className={'pr2'} style={{ alignSelf: 'center' }}>
              <span className="b">Directions</span>
            </div>
            <div style={{ alignSelf: 'center', flexBasis: '100px' }}>
              <Icon
                circular
                name={'arrows alternate horizontal'}
                size={'small'}
              />
              <div className={'dib v-mid pa1 b f6'}>
                {summary.length.toFixed(1) + 'km'}
              </div>
            </div>
            <div style={{ alignSelf: 'center', flexGrow: 1 }}>
              <Icon circular name={'time'} size="small" />
              <div className={'dib v-mid pa1 b f6'}>
                {this.formatDuration(summary.time)}
              </div>
            </div>
            <div style={{ alignSelf: 'center' }}>
              <Checkbox
                slider
                label={'Map'}
                checked={results[provider].show}
                provider={provider}
                onChange={this.handleChange}
              />
            </div>
          </React.Fragment>
        ) : (
          <div>No route found</div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { results } = state.directions
  return {
    results
  }
}

export default connect(mapStateToProps)(Summary)
