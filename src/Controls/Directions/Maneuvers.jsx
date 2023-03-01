import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Header, Icon, Divider, Dropdown } from 'semantic-ui-react'

import { highlightManeuver, zoomToManeuver } from 'actions/directionsActions'
import { updateSettings } from 'actions/commonActions'
import { availableLanguageOptions } from 'Controls/settings-options'

const getLength = (length) => {
  const visibleLength = length * 1000
  if (visibleLength < 1000) {
    return visibleLength + 'm'
  }
  return (visibleLength / 1000).toFixed(2) + 'km'
}

class Maneuvers extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    results: PropTypes.object,
    language: PropTypes.string,
    header: PropTypes.string,
    provider: PropTypes.string,
    profile: PropTypes.string,
  }

  highlightMnv = (sIdx, eIdx) => {
    const { dispatch } = this.props
    dispatch(highlightManeuver({ startIndex: sIdx, endIndex: eIdx }))
  }

  zoomToMnv = (sIdx) => {
    const { dispatch } = this.props
    dispatch(zoomToManeuver({ index: sIdx, timeNow: Date.now() }))
  }
  handleUpdateSettings = ({ name, value }) => {
    const { dispatch } = this.props
    dispatch(
      updateSettings({
        name,
        value,
      })
    )
  }
  render() {
    const { provider, results } = this.props

    const legs = R.path([provider, 'data', 'trip', 'legs'], results)

    const startIndices = {
      0: 0,
    }
    if (legs) {
      for (let i = 0; i < legs.length - 1; i++) {
        const endShapeIndex =
          legs[i].maneuvers[legs[i].maneuvers.length - 1].end_shape_index
        startIndices[i + 1] = endShapeIndex
      }
    }

    return (
      <React.Fragment>
        <Dropdown
          className="mv3"
          placeholder="Select Language"
          onChange={(_, data) => this.handleUpdateSettings(data)}
          value={this.props.language}
          selection
          name={'language'}
          options={availableLanguageOptions}
        />
        {legs &&
          legs.map((leg, i) =>
            leg.maneuvers.map((mnv, j) => (
              <React.Fragment key={j}>
                <div
                  style={{ maxWidth: '300px' }}
                  className={'flex-column pt3 pb3 pointer'}
                  onMouseEnter={() =>
                    this.highlightMnv(
                      startIndices[i] + mnv.begin_shape_index,
                      startIndices[i] + mnv.end_shape_index
                    )
                  }
                  onMouseLeave={() =>
                    this.highlightMnv(
                      startIndices[i] + mnv.begin_shape_index,
                      startIndices[i] + mnv.end_shape_index
                    )
                  }
                  onClick={() =>
                    this.zoomToMnv(startIndices[i] + mnv.begin_shape_index)
                  }
                >
                  <div className="pb2">
                    <Header as="h4">{mnv.instruction}</Header>
                  </div>
                  {mnv.type !== 4 && mnv.type !== 5 && mnv.type !== 6 && (
                    <div className={'flex justify-between'}>
                      <div
                        style={{
                          alignSelf: 'center',
                          flexBasis: '100px',
                        }}
                      >
                        <Icon
                          circular
                          name={'arrows alternate horizontal'}
                          size="small"
                        />
                        <div className={'dib pa1 f6'}>
                          {getLength(mnv.length)}
                        </div>
                      </div>
                      <div
                        style={{
                          alignSelf: 'center',
                          flexGrow: 1,
                        }}
                      >
                        <Icon circular name={'time'} size="small" />
                        <div className={'dib pa1 f6'}>
                          {new Date(mnv.time * 1000)
                            .toISOString()
                            .substr(11, 8)}
                        </div>
                      </div>
                      <div
                        style={{
                          alignSelf: 'center',
                          flexBasis: '80px',
                        }}
                      >
                        <Icon circular name={'bolt'} size="small" />
                        <div className={'dib pa1 f6'}>
                          {mnv.cost.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {mnv.type !== 4 && mnv.type !== 5 && mnv.type !== 6 && (
                  <Divider fitted />
                )}
              </React.Fragment>
            ))
          )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { results } = state.directions
  const language = state.common.settings.language
  return {
    results,
    language,
  }
}

export default connect(mapStateToProps)(Maneuvers)
