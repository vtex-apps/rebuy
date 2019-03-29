import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, path } from 'ramda'
import { graphql } from 'react-apollo'
import { session } from 'vtex.store-resources/Queries'

import userLastOrder from './queries/userLastOrder.gql'
import Content from './components/Content'
import { userLastOrderType } from './components/propTypes'

class Rebuy extends Component {
  container = React.createRef()

  static propTypes = {
    lastOrderQuery: PropTypes.shape({
      loading: PropTypes.bool,
      userLastOrder: userLastOrderType,
    }),
    sessionQuery: PropTypes.shape({
      loading: PropTypes.bool,
      getSession: PropTypes.shape({ 
        profile: PropTypes.object,
      }),
    }),
  }
  state = {
    isVisible: false,
  }

  componentDidUpdate(prevProps) {
    const getProfile = (props) => path(['sessionQuery', 'getSession', 'profile'], props)
    const oldProfile = getProfile(prevProps)
    const currentProfile = getProfile(this.props)

    // Checking if user just logged in
    if (oldProfile == null && currentProfile != null) {
      this.props.lastOrderQuery.refetch()
    }
  }

  triggerOpenTransition = () => {
    setTimeout(() => {
      this.setState({
        isVisible: true,
      })

      const containerElement = this.container.current

      if (!containerElement) {
        return
      }

      const transitionDuration = 800
      // get the actual container height
      containerElement.style.height = 'auto'
      const containerHeight = containerElement.clientHeight

      // sets the height back to zero, and triggers a layout,
      // by trying to get getBoundingClientRect
      containerElement.style.height = 0
      containerElement.getBoundingClientRect()

      // sets the transition and set the height to the target value
      containerElement.style.transition = `height ${transitionDuration}ms ease-in-out`
      containerElement.style.height = `${containerHeight}px`

      // after the transition, sets the height to auto, in case the
      // content or height change
      setTimeout(() => {
        containerElement.style.height = 'auto'
      }, transitionDuration + 100)
    }, 500)
  }

  render() {
    const { isVisible } = this.state

    const lastOrder = path(['lastOrderQuery', 'userLastOrder'], this.props)

    if (!lastOrder) {
      return null
    }

    if (!isVisible) {
      this.triggerOpenTransition()
    }
    return <Content lastOrder={lastOrder} />
  }
}

export default compose (
  graphql(session, { name: 'sessionQuery'}),
  graphql(userLastOrder, { name: 'lastOrderQuery'}),
)(Rebuy)
