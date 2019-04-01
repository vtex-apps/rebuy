import React from 'react'
import { arrayOf, number } from 'prop-types'
import { Link } from 'vtex.render-runtime'
import ProductPrice from 'vtex.store-components/ProductPrice'

import { orderItemType } from './propTypes'
import ItemImage from './ItemImage'

import { sumTotalPricePerUnit } from '../utils/attachments'

import rebuy from '../rebuy.css'

const OrderItem = ({ item, index, assemblyOptions }) => (
  <li className={`${rebuy.item} flex justify-between pt3 bb b--muted-4`}>
    <div className={`${rebuy.itemColumn} flex-shrink-0 mr5`}>
      <Link className="link c-muted-1" to={item.detailUrl}>
        <ItemImage size={64} imageUrl={item.imageUrl} />
      </Link>
    </div>
    <div className={`${rebuy.itemColumn} flex-auto`}>
      <div className={`${rebuy.itemDetails} flex justify-center justify-between-ns items-center-ns flex-column flex-row-ns h-100 mb2-s`}>
        <Link className="link t-body t-heading-5-ns c-on-base" to={item.detailUrl}>
          <span className={`${rebuy.itemName}`}>{`${item.quantity}x ${item.name}`}</span>
        </Link>
        <span className={`${rebuy.itemPrice}`}>
          <ProductPrice
            sellingPriceClass="c-on-base t-body t-heading-5-ns b-s"
            sellingPrice={sumTotalPricePerUnit(assemblyOptions, index, item) / 100}
            showListPrice={false}
            showLabels={false}
          />
        </span>
      </div>
    </div>
  </li>
)

OrderItem.propTypes = {
  item: orderItemType.isRequired,
  index: number.isRequired,
  assemblyOptions: arrayOf(orderItemType).isRequired,
}

export default OrderItem