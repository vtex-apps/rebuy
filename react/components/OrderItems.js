import React from 'react'
import { arrayOf } from 'prop-types'

import { orderItemType } from './propTypes'
import OrderItem from './OrderItem'

import { isParentItem, separateParentChildren } from '../utils/attachments'

import rebuy from '../rebuy.css'

const OrderItems = ({ items = [] }) => {
  const [_, assemblyOptions] = separateParentChildren(items)
  return (
    <ul className={`${rebuy.items} list ma0 pa0`}>
      {items.map((item, index) => isParentItem(item) ? (
        <OrderItem {...{ item, assemblyOptions, index}} />
      ) : null)}
    </ul>
  )
}

OrderItems.propTypes = {
  items: arrayOf(orderItemType),
}

export default OrderItems
