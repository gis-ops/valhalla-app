import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon, Header, Checkbox, Label } from 'semantic-ui-react'
import { showProvider } from '../../actions/isochronesActions'

class OutputControlColumn extends React.Component {
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
    const { header, provider, results } = this.props

    const { features } = results[provider].data

    return (
      <React.Fragment>
        <div className={'flex flex-row justify-between'}>
          <Header as={'h5'}>{header}</Header>
          <Checkbox
            slider
            checked={results[provider].show}
            provider={provider}
            onChange={this.handleChange}
          />
        </div>
        {features ? (
          features.map((feature, key) => {
            return (
              <div key={key}>
                <div>
                  <div className={'dib v-mid pr2 f6 pt1 pb1'}>
                    {feature.properties.contour + ' mins'}
                  </div>
                  <Icon className={'dib v-mid'} circular name={'move'} />
                  <div className={'dib v-mid pa1 b f6'}>
                    {feature.properties.area.toFixed(0)}
                  </div>
                  <Label size="tiny" className={'dib v-mid fr'}>
                    km²
                  </Label>
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

export default connect(mapStateToProps)(OutputControlColumn)
