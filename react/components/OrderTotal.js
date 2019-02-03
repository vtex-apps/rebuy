import React from 'react'
import { number } from 'prop-types'
import ProductPrice from 'vtex.store-components/ProductPrice'

const OrderTotal = ({ value }) => (
  <div className="vtex-rebuy__total flex justify-end items-end mt6-s">
    <span className="vtex-rebuy__total-title t-heading-5 c-on-base">Total</span>
    <span className="vtex-rebuy__total-price ml4">
      <ProductPrice sellingPriceClass="c-on-base t-heading-5" sellingPrice={value / 100} showListPrice={false} showLabels={false} />
    </span>
  </div>
)

OrderTotal.propTypes = {
  value: number.isRequired,
}

export default OrderTotal
