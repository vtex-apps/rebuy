import React, { memo } from 'react'
import { number } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'

const OrderTotal = ({ value = 0 }) => (
  <div className="vtex-rebuy__total flex justify-end items-end mt6-s">
    <span className="vtex-rebuy__total-title t-heading-5 c-on-base">
      <FormattedMessage id="rebuy.total" />
    </span>
    <span className="vtex-rebuy__total-price ml4">
      <ProductPrice sellingPriceClass="c-on-base t-heading-5" sellingPrice={value / 100} showListPrice={false} showLabels={false} />
    </span>
  </div>
)

OrderTotal.propTypes = {
  value: number.isRequired,
}

export default memo(OrderTotal)
