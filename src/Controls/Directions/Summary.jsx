import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { intervalToDuration } from 'date-fns'

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
    const duration = intervalToDuration({
      start: 0,
      end: durationInSeconds * 1000
    })

    let durationStr = ''
    if (duration.days > 0) {
      durationStr += duration.days + 'd '
    }
    if (duration.hours > 0) {
      durationStr += duration.hours + 'h '
    }
    if (duration.minutes > 0) {
      durationStr += duration.minutes + 'min '
    }
    if (duration.seconds > 0) {
      durationStr += duration.seconds + 'sec'
    }
    return durationStr
  }

  render() {
    const { provider, results } = this.props

    const summary = R.path([provider, 'data', 'trip', 'summary'], results)

    return (
      <React.Fragment>
        {summary ? (
          <React.Fragment>
            <div className="flex mb1">
              <span className="b">Directions</span>
            </div>
            <div className={'flex justify-between pb3 pointer'}>
              <div style={{ alignSelf: 'center', flexBasis: '100px' }}>
                <Icon
                  circular
                  name={'arrows alternate horizontal'}
                  size={'small'}
                />
                <div className={'dib v-mid pa1 b f6'}>
                  {`${summary.length.toFixed(
                    summary.length > 1000 ? 0 : 1
                  )} km`}
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
