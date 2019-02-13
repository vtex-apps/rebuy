import React, { memo } from 'react'
import { number } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

import rebuy from '../rebuy.css'

const OrderTotal = ({ value = 0 }) => (
  <div className={`${rebuy.totalContainer} flex justify-end items-end mt6-s`}>
    <span className={`${rebuy.totalTitle} t-heading-5 c-on-base`}>
      <FormattedMessage id="rebuy.total" />
    </span>
    <span className={`${rebuy.totalPrice} ml4`}>
      <ProductPrice sellingPriceClass="c-on-base t-heading-5" sellingPrice={value / 100} showListPrice={false} showLabels={false} />
    </span>
  </div>
)

OrderTotal.propTypes = {
  value: number.isRequired,
}

export default memo(OrderTotal)
