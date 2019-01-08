import React, { Component } from 'react'
import { array, bool, shape } from 'prop-types'
import { head, map, path, pick, prop } from 'ramda'
import { Box } from 'vtex.styleguide'
import { contextPropTypes } from 'vtex.store-resources/OrderFormContext'
import { ExtensionPoint } from 'render'

import Header from './Header'
import OrderItems from './OrderItems'
import OrderTotal from './OrderTotal'
import withFetch from './withFetch'

class Rebuy extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
  }

  static propTypes = {
    orderFormContext: contextPropTypes,
    fetchContext: shape({
      loading: bool,
      data: array,
    }),
  }
  state = {
    isAddingToCart: false,
    isVisible: false,
  }

  handleClickBuy = () => {
    const { orderFormContext, fetchContext } = this.props

    const lastOrder = head(prop('data', fetchContext))

    const minicartButton = document.querySelector('.vtex-minicart .vtex-button')

    this.setState({ isAddingToCart: true })
    orderFormContext
      .addItem({
        variables: {
          orderFormId: path(['orderForm', 'orderFormId'], orderFormContext),
          items: map(pick(['id', 'quantity', 'seller']), prop('items', lastOrder)),
        },
      })
      .then(() => {
        this.setState({ isAddingToCart: false })
        orderFormContext.refetch().then(() => minicartButton.click())
      })
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
    const {
      fetchContext: { data, error, loading },
    } = this.props
    const { isAddingToCart, isVisible } = this.state

    if (loading) {
      return null
    }

    if (error >= 400) {
      console.warn(
        'The "lastOrders" schema seems to be missing. Create it according to the instruction on README.'
      )
      return null
    }

    const lastOrder = head(data)

    if (!lastOrder) {
      return null
    }

    if (!isVisible) {
      this.triggerOpenTransition()
    }

    return (
      <section className="vtex-rebuy vtex-page-padding overflow-hidden h0" ref={this.container}>
        <ExtensionPoint id="greeting" />
        <Header onClickBuy={this.handleClickBuy} loading={isAddingToCart} />
        <div className="vtex-rebuy__box">
          <Box>
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={prop('value', lastOrder)} />
          </Box>
        </div>
      </section>
    )
  }
}

export default withFetch(Rebuy)
