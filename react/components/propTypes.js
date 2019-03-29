import PropTypes from 'prop-types'

export const orderItemType = PropTypes.shape({
  uniqueId: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  sellingPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  detailUrl: PropTypes.string,
  quantity: PropTypes.number,
  parentItemIndex: PropTypes.number,
  parentAssemblyBinding: PropTypes.string,
  seller: PropTypes.string,
  additionalInfo: PropTypes.shape({ brandName: PropTypes.string }),
})

export const userLastOrderType = PropTypes.shape({
  orderId: PropTypes.string,
  value: PropTypes.number,
  orderGroup: PropTypes.string,
  items: PropTypes.arrayOf(orderItemType),
  totals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number,
  }))
})
