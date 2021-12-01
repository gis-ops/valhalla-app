import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Search, Icon, Label, Popup } from 'semantic-ui-react'
import {
  doRemoveWaypoint,
  updateTextInput,
  fetchGeocode,
  makeRequest
} from 'actions/directionsActions'
import { debounce } from 'throttle-debounce'

class Waypoint extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    userInput: PropTypes.string,
    isFetching: PropTypes.bool,
    results: PropTypes.array,
    geocodeResults: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = { isClicked: false }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.fetchGeocodeResults = debounce(0, this.fetchGeocodeResults)
  }

  fetchGeocodeResults(e) {
    const { dispatch, index, userInput } = this.props
    if (userInput.length > 0 && e == 'Enter') {
      dispatch(
        fetchGeocode({
          inputValue: userInput,
          index: index
        })
      )
    }
  }

  handleSearchChange = event => {
    for (const results of document.getElementsByClassName('results')) {
      document.getElementById(window._env_.ROOT_ELEMENT).appendChild(results)
    }

    const { dispatch, index } = this.props
    dispatch(
      updateTextInput({
        inputValue: event.target.value,
        index: index
      })
    )
  }

  // handleSelectionChange = event => {
  //   console.log(event.target.value);
  // };

  handleResultSelect = (e, { result }) => {
    const { dispatch, index } = this.props
    dispatch(
      updateTextInput({
        inputValue: result.title,
        index: index,
        addressindex: result.addressindex
      })
    )
    dispatch(makeRequest())
  }

  render() {
    const { dispatch, isFetching, geocodeResults, userInput } = this.props

    return (
      <React.Fragment>
        <div className="flex flex-row justify-between items-center">
          <Popup
            content={'Re-shuffle this waypoint'}
            size={'tiny'}
            trigger={
              <Label basic size="small">
                <Icon name="ellipsis vertical" />
                {parseInt(this.props.index) + 1}
              </Label>
            }
          />
          <Search
            className={'pa2 ' + this.props.index}
            size="small"
            input={{ icon: 'search', iconPosition: 'left' }}
            onSearchChange={this.handleSearchChange}
            onResultSelect={this.handleResultSelect}
            type="text"
            loading={isFetching}
            results={geocodeResults}
            value={userInput}
            onKeyPress={(event: React.KeyboardEvent) => {
              this.fetchGeocodeResults(event.key)
            }}
            placeholder="Hit enter for search..."
          />
          <Popup
            content={'Remove this waypoint'}
            size={'tiny'}
            trigger={
              <Icon
                className="pointer"
                name="remove"
                size="small"
                onClick={() => dispatch(doRemoveWaypoint(this.props.index))}
              />
            }
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { index } = ownProps
  const waypoint = state.directions.waypoints[index]
  const { geocodeResults, userInput, isFetching } = waypoint
  return {
    userInput,
    geocodeResults,
    isFetching
  }
}

export default connect(mapStateToProps)(Waypoint)
