import React, { Component } from 'react'
import { path } from 'ramda'
import { Spinner } from 'vtex.styleguide'
import { orderFormConsumer, contextPropTypes } from 'vtex.store/OrderFormContext'

import Rebuy from './components/Rebuy'

import './global.css'

/**
 * TODO: Show listing of attachments for each SKU when orderForm enables that
 */
class RebuyContainer extends Component {
  static propTypes = { orderFormContext: contextPropTypes }
  schemaName = 'lastOrders'

  getOrdersURL = ({ schemaName, email }) =>
    `/api/dataentities/orders/search?_schema=${schemaName}&_where=clientProfileData.email=${email}&_sort=createdIn DESC`

  render() {
    const { loading, orderForm } = this.props.orderFormContext

    const email = !loading && path(['clientProfileData', 'email'], orderForm)

    const ordersURL = email && this.getOrdersURL({ schemaName: this.schemaName, email })

    return <Rebuy url={ordersURL || undefined} {...this.props} />
  }
}

export default orderFormConsumer(RebuyContainer)
