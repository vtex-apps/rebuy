import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { prop, path } from 'ramda'
import { Link } from 'render'
import ProductPrice from 'vtex.store-components/ProductPrice'

const OrderItems = ({ items = [] }) => (
  <ul className="vtex-rebuy__items list ma0 pa0">
    {items.map(item => (
      <li
        key={prop('uniqueId', item)}
        className="vtex-rebuy__item flex justify-between pt3"
      >
        <div className="vtex-rebuy__item-column flex-shrink-0 mr5">
          <Link className="link c-muted-1" to={path(['detailUrl'], item)}>
            <img
              height="55"
              width="55"
              className="vtex-rebuy__item-img"
              src={prop('imageUrl', item)}
            />
          </Link>
        </div>
        <div className="vtex-rebuy__item-column flex-auto">
          <div className="vtex-rebuy__item-details flex justify-between items-center h-100 b">
            <Link className="link c-muted-1" to={path(['detailUrl'], item)}>
              <span className="vtex-rebuy__item-details">{`${prop(
                'quantity',
                item
              )}x ${prop('name', item)}`}</span>
            </Link>
            <span className="vtex-rebuy__item-price ">
              <ProductPrice
                sellingPrice={prop('sellingPrice', item) / 100}
                showListPrice={false}
              />
            </span>
          </div>
        </div>
      </li>
    ))}
  </ul>
)

OrderItems.propTypes = {
  items: arrayOf(
    shape({
      uniqueId: string.isRequired,
      imageUrl: string.isRequired,
      quantity: number.isRequired,
      sellingPrice: number.isRequired
    })
  )
}

export default OrderItems
