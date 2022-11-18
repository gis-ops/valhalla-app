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

const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: '100%',
    //height: 200,
    paddingBottom: 20,
    maxHeight: 350,
    height: 300,
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
            Array(3)
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
                                className={`flex flex-column overflow-auto`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {waypoints.map((wp, index) => (
                                    <Draggable
                                        key={wp.id}
                                        draggableId={wp.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style
                                                )}
                                            >
                                                <Waypoint
                                                    id={wp.id}
                                                    index={index}
                                                    value={wp.text}
                                                    geocodeResults={
                                                        wp.geocodeResults
                                                    }
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
