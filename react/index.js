import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { head, prop } from 'ramda'
import { Box, Spinner } from 'vtex.styleguide'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import pkg from './package.json'
import WithFetch from './WithFetch'
import { Header, OrderItems, OrderTotal } from './components'

import './global.css'

class Rebuy extends Component {
  static propTypes = { orderFormContext: contextPropTypes }
  static contextTypes = { getSettings: func }
  baseURL = '/api/dataentities/orders/search'

  handleClickBuy = () => {}

  get settings() {
    const { schemaName = 'lastOrders', ...settings } = this.context.getSettings(
      `${pkg.vendor}.${pkg.name}`
    )
    return { schemaName, ...settings }
  }

  render() {
    const { schemaName } = this.settings
    const { loading, orderForm } = this.props.orderFormContext

    if (loading) return <Spinner />

    return (
      <WithFetch url={`${this.baseURL}?_schema=${schemaName}&_sort=createdIn DESC`}>
        {({ data = [], loading }) => {
          if (loading) return <Spinner />

          const lastOrder = head(data)
          if (!lastOrder) return null

          return (
            <section className="vtex-rebuy vtex-page-padding">
              <Header onClickBuy={this.handleClickBuy} />
              <div className="vtex-rebuy__box">
                <Box>
                  <OrderItems items={prop('items', lastOrder)} />
                  <OrderTotal value={prop('value', lastOrder)} />
                </Box>
              </div>
            </section>
          )
        }}
      </WithFetch>
    )
  }
}

export default orderFormConsumer(Rebuy)
