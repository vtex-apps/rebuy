import React, { Component } from 'react'
import { array, bool, shape } from 'prop-types'
import { head, map, path, pick, prop } from 'ramda'
import { Box, Spinner } from 'vtex.styleguide'
import { contextPropTypes } from 'vtex.store/OrderFormContext'

import Header from './Header'
import OrderItems from './OrderItems'
import OrderTotal from './OrderTotal'
import withFetch from './withFetch'

class Rebuy extends Component {
  static propTypes = {
    orderFormContext: contextPropTypes,
    fetchContext: shape({
      loading: bool,
      data: array,
    }),
  }
  state = { isAddingToCart: false }

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

  render() {
    const {
      fetchContext: { data, error, loading },
    } = this.props
    const { isAddingToCart } = this.state

    if (loading) {
      return <Spinner />
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

    return (
      <section className="vtex-rebuy vtex-page-padding">
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
