import React from 'react'
import { number } from 'prop-types'
import ProductPrice from 'vtex.store-components/ProductPrice'

const OrderTotal = ({ value }) => (
  <div className="vtex-rebuy__total mt4 flex justify-between items-baseline">
    <span className="vtex-rebuy__total-title fw9">TOTAL</span>
    <span className="vtex-rebuy__total-price">
      <ProductPrice sellingPrice={value / 100} showListPrice={false} />
    </span>
  </div>
)

OrderTotal.propTypes = {
  value: number.isRequired,
}

export default OrderTotal
