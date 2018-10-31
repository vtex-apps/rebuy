import React, { Component } from 'react'
import { func } from 'prop-types'
import { path } from 'ramda'
import { Spinner } from 'vtex.styleguide'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import pkg from './package.json'
import Rebuy from './components/Rebuy'

import './global.css'

/**
 * TODO: Show listing of attachments for each SKU when orderForm enables that
 */
class RebuyContainer extends Component {
  static propTypes = { orderFormContext: contextPropTypes }
  static contextTypes = { getSettings: func }

  get settings() {
    const { schemaName = 'lastOrders', ...settings } = this.context.getSettings(
      `${pkg.vendor}.${pkg.name}`
    )
    return { schemaName, ...settings }
  }

  getOrdersURL = ({ schemaName, email }) =>
    `/api/dataentities/orders/search?_schema=${schemaName}&_where=clientProvileData.email=${email}&_sort=createdIn DESC`

  render() {
    const { schemaName } = this.settings
    const { loading, orderForm } = this.props.orderFormContext

    if (loading) return <Spinner />

    const email = path(['clientProfileData', 'email'], orderForm)
    if (!email) return null

    const ordersURL = this.getOrdersURL({ schemaName, email })

    return <Rebuy url={ordersURL} {...this.props} />
  }
}

export default orderFormConsumer(RebuyContainer)
