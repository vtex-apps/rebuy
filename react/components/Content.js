import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isMobileOnly } from 'react-device-detect'
import { prop, find, propEq } from 'ramda'
import { ExtensionPoint } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import BuyButton from 'vtex.store-components/BuyButton'

import OrderItems from './OrderItems'
import OrderTotal from './OrderTotal'

const Wrapper = ({children}) => (
  <div className="mv4 mh4 mh6-ns bg-base border-box br1 bw1 ba b--light-gray">
    {children}
  </div>
)

const LastOrderLabel = () => (
  <div className="t-body c-on-base ml4-ns">
    <FormattedMessage id="rebuy.last-order" />
  </div>
) 
  
const AddButton = ({ products }) => (
  <div className="pt5 pt7-ns mh5">
    <BuyButton skuItems={products} large >
      <div className="flex w-100 justify-center items-center ttu t-body">
        <FormattedMessage id="rebuy.add-to-cart" />
      </div>
    </BuyButton>
  </div>
)

const findItemTotal = (lastOrder) => prop('value' ,find(propEq('id', 'Items'))(prop('totals', lastOrder)))

class Content extends Component {
  static propTypes = {
    lastOrder: userLastOrderType,
    products: PropTypes.arrayOf(PropTypes.shape({
      skuId: PropTypes.string.isRequired,
      seller: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(PropTypes.shape({
        assemblyId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        seller: PropTypes.string.isRequired,
      }))
    }))
  }


  renderMobile = () => {
    const { lastOrder, products } = this.props

    return (
      <Fragment>
        <ExtensionPoint id="greeting" />
        <Wrapper>
          <div className="w-100 pa4 flex flex-column">
            <LastOrderLabel />
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={findItemTotal(lastOrder)} />
          </div>
        </Wrapper>
        <AddButton products={products} />
      </Fragment> 
    )
  }

  render() {
    const { lastOrder, products } = this.props

    if (isMobileOnly) { return this.renderMobile() }

    return (
      <Wrapper>
        <div className="w-100 pv6 ph4 flex">
          <div className="w-third">
            <ExtensionPoint id="greeting" />
            <LastOrderLabel />
            <AddButton products={products} />
          </div>
          <div className="mh6 ba b--muted-4" style={{ width: '1px' }} />
          <div className="w-two-thirds flex flex-column justify-between">
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={findItemTotal(lastOrder)} />
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Content