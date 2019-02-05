import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { prop, path, filter, propEq } from 'ramda'
import { Link } from 'vtex.render-runtime'
import ProductPrice from 'vtex.store-components/ProductPrice'

import { separateParentChildren } from '../utils/attachments'

const isSonOfIndex = (index) => propEq('parentItemIndex', index)

const sumTotalPricePerUnit = (assemblyOptions, parentIndex, parentQuantity, parentPrice) => {
  const children = filter(isSonOfIndex(parentIndex), assemblyOptions)
  return children.reduce(
    (total, item) => total + item.sellingPrice * item.quantity / parentQuantity,
    parentPrice
    )
}

const OrderItems = ({ items = [] }) => {
  const [parentItems, assemblyOptions] = separateParentChildren(items)
  return (
    <ul className="vtex-rebuy__items list ma0 pa0">
      {parentItems.map((item, index) => (
        <li
          key={prop('uniqueId', item)}
          className="vtex-rebuy__item flex justify-between pt3 bb b--muted-4"
        >
          <div className="vtex-rebuy__item-column flex-shrink-0 mr5">
            <Link className="link c-muted-1" to={path(['detailUrl'], item)}>
              <img
                height="64"
                width="64"
                className="vtex-rebuy__item-img"
                src={prop('imageUrl', item)}
              />
            </Link>
          </div>
          <div className="vtex-rebuy__item-column flex-auto">
            <div className="vtex-rebuy__item-details flex justify-center justify-between-ns items-center-ns flex-column flex-row-ns h-100">
              <Link className="link t-body t-heading-5-ns c-on-base" to={path(['detailUrl'], item)}>
                <span className="vtex-rebuy__item-details">{`${prop(
                  'quantity',
                  item
                )}x ${prop('name', item)}`}</span>
              </Link>
              <span className="vtex-rebuy__item-price ">
                <ProductPrice
                  sellingPriceClass="c-on-base t-body t-heading-5-ns b-s"
                  sellingPrice={sumTotalPricePerUnit(assemblyOptions, index, item.quantity, item.sellingPrice) / 100}
                  showListPrice={false}
                  showLabels={false}
                />
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

OrderItems.propTypes = {
  items: arrayOf(
    shape({
      uniqueId: string.isRequired,
      imageUrl: string.isRequired,
      quantity: number.isRequired,
      sellingPrice: number.isRequired,
      parentItemIndex: number,
      parentAssemblyBinding: string,
      id: string.isRequired,
      name: string.isRequired,
      detailUrl: string,
    })
  )
}

export default OrderItems
