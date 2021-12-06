import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import DirectionsControl from './Directions'
import IsochronesControl from './Isochrones'
import DirectionOutputControl from './Directions/OutputControl'
import IsochronesOutputControl from './Isochrones/OutputControl'
import { Segment, Tab } from 'semantic-ui-react'
import { updateTab } from 'actions/commonActions'

const controlStyle = {
  zIndex: 999,
  position: 'absolute',
  width: '420px',
  top: '10px',
  left: '10px',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 3vw)'
}

class MainControl extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.object,
    activeDataset: PropTypes.string
  }

  state = {
    activeIndex: 0
  }

  componentDidMount = () => {
    const { dispatch } = this.props

    toast({
      type: 'success',
      icon: 'heart',
      title: 'Welcome to Valhalla!',
      description: 'Global Routing Service - sponsored by FOSSGIS e.V.',
      time: 5000
    })

    let activeTab
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/directions'
    ) {
      activeTab = 0
      this.setState({ activeIndex: activeTab })
      dispatch(updateTab({ activeTab }))
    } else if (window.location.pathname === '/isochrones') {
      activeTab = 1
      this.setState({ activeIndex: activeTab })
      dispatch(updateTab({ activeTab }))
    }
  }

  componentDidUpdate = prevProps => {
    const { message } = this.props

    if (message.receivedAt > prevProps.message.receivedAt) {
      toast({
        type: message.type,
        icon: message.icon,
        title: message.topic,
        description: message.description,
        time: 5000
      })
    }
  }

  handleTabChange = (event, data) => {
    const { dispatch } = this.props
    const activeTab = data.activeIndex
    this.setState({ activeIndex: activeTab })

    if (activeTab == 0) {
      window.history.replaceState(
        'directions',
        'Valhalla Directions',
        '/directions'
      )
    } else {
      window.history.replaceState(
        'isochrones',
        'Valhalla Isochrones',
        '/isochrones'
      )
    }

    dispatch(updateTab({ activeTab }))
  }

  render() {
    const appPanes = [
      {
        menuItem: 'Directions',
        render: () => (
          <Tab.Pane style={{ padding: '0 0 0 0' }} attached={false}>
            <DirectionsControl />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Isochrones',
        render: () => (
          <Tab.Pane style={{ padding: '0 0 0 0' }} attached={false}>
            <IsochronesControl />
          </Tab.Pane>
        )
      }
    ]

    const ServiceTabs = () => (
      <Tab
        activeIndex={this.state.activeIndex}
        onTabChange={this.handleTabChange}
        menu={{ pointing: true }}
        panes={appPanes}
      />
    )

    return (
      <div style={controlStyle}>
        <Segment basic style={{ paddingBottom: 0 }}>
          <div>
            <ServiceTabs />
          </div>
        </Segment>
        <DirectionOutputControl />
        <IsochronesOutputControl />
        <SemanticToastContainer position="bottom-center" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { message } = state.common
  return {
    message
  }
}

export default connect(mapStateToProps)(MainControl)
