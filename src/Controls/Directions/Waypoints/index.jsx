import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import Waypoint from './Waypoint'
import {
  doAddWaypoint,
  setWaypoints,
  makeRequest,
} from 'actions/directionsActions'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  paddingLeft: 16,
  paddingRight: 16,
  //background: isDragging ? 'lightgreen' : 'transparent',
  // styles we need to apply on draggables
  ...draggableStyle,
})

class Waypoints extends Component {
  static propTypes = {
    directions: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.state = { visible: false }
  }

  handleDismiss = () => {
    this.setState({ visible: false })
  }

  componentDidMount = () => {
    const { dispatch, directions } = this.props
    this.setState({ visible: true })

    if (directions.waypoints.length === 0) {
      Array(2)
        .fill()
        .map((_, i) => dispatch(doAddWaypoint()))
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const { dispatch, directions } = this.props

    const items = reorder(
      directions.waypoints,
      result.source.index,
      result.destination.index
    )
    dispatch(setWaypoints(items))
    dispatch(makeRequest())
  }

  render() {
    const { waypoints } = this.props.directions
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <React.Fragment>
              <div
                className="flex flex-column"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ minHeight: '22rem' }}
              >
                {waypoints.map((wp, index) => (
                  <Draggable key={wp.id} draggableId={wp.id} index={index}>
                    {(provided_inner, snapshot_inner) => (
                      <div
                        ref={provided_inner.innerRef}
                        {...provided_inner.draggableProps}
                        {...provided_inner.dragHandleProps}
                        style={getItemStyle(
                          snapshot_inner.isDragging,
                          provided_inner.draggableProps.style
                        )}
                      >
                        <Waypoint
                          id={wp.id}
                          index={index}
                          value={wp.text}
                          geocodeResults={wp.geocodeResults}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </React.Fragment>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

const mapStateToProps = (state) => {
  const { directions } = state
  return {
    directions,
  }
}

export default connect(mapStateToProps)(Waypoints)
