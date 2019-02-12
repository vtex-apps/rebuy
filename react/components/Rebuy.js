import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { path, prop } from 'ramda'
import { contextPropTypes } from 'vtex.store-resources/OrderFormContext'
import { graphql } from 'react-apollo'

import userLastOrder from '../queries/userLastOrder.gql'

import Content from './Content'
import { userLastOrderType } from './propTypes'
import { buildItemsWithOptions } from '../utils/attachments'

class Rebuy extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
  }

  static propTypes = {
    orderFormContext: contextPropTypes,
    lastOrderQuery: PropTypes.shape({
      loading: PropTypes.bool,
      userLastOrder: userLastOrderType,
    })
  }
  state = {
    isVisible: false,
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

    return (
      <Content 
        lastOrder={lastOrder} 
        products={buildItemsWithOptions(prop('items', lastOrder))} />
    )
  }
}

export default graphql(userLastOrder, { name: 'lastOrderQuery', options: {ssr: false}})(Rebuy)
