import React, { Fragment, useCallback, useState} from 'react'
import { isMobileOnly } from 'react-device-detect'
import { prop, find, propEq } from 'ramda'
import { ExtensionPoint } from 'vtex.render-runtime'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'
import OrderItems from './OrderItems'
import OrderTotal from './OrderTotal'
import { userLastOrderType } from './propTypes'

const Wrapper = ({children}) => (
  <div className="mv4 mh4 mh6-ns bg-base border-box br1 bw1 ba b--muted-4">
    {children}
  </div>
)

const LastOrderLabel = () => (
  <div className="t-body c-on-base ml4-ns">
    <FormattedMessage id="store/rebuy.last-order" />
  </div>
) 
  
const AddButton = ({ onClick, isLoading }) => (
  <div className="pt5 pt7-ns mh5">
    <Button block onClick={onClick} isLoading={isLoading}>
      <FormattedMessage id="store/rebuy.add-to-cart" />
    </Button>
  </div>
)

const findItemTotal = (lastOrder) => prop('value', find(propEq('id', 'Items'), lastOrder.totals))

const MobileContent = ({ lastOrder, onClick, isLoading }) => (
  <Fragment>
    <ExtensionPoint id="greeting" />
    <Wrapper>
      <div className="w-100 pa4 flex flex-column">
        <LastOrderLabel />
        <OrderItems items={lastOrder.items} />
        <OrderTotal value={findItemTotal(lastOrder)} />
      </div>
    </Wrapper>
    <AddButton onClick={onClick} isLoading={isLoading} />
  </Fragment> 
)

const Content = ({ lastOrder }) => {
  const [isLoading, setLoading] = useState(false);

  const goToCart = useCallback(() => {
    setLoading(true)
    location.assign(`/checkout/orderform/createby/${lastOrder.orderGroup}`)
  }, [lastOrder.orderGroup])

  if (isMobileOnly) {
    return <MobileContent lastOrder={lastOrder} onClick={goToCart} isLoading={isLoading} />
  }
  return (
    <Wrapper>
      <div className="w-100 pv6 ph4 flex">
        <div className="w-third">
          <ExtensionPoint id="greeting" />
          <LastOrderLabel />
          <AddButton onClick={goToCart} isLoading={isLoading} />
        </div>
        <div className="mh6 ba b--muted-4" style={{ width: '1px' }} />
        <div className="w-two-thirds flex flex-column justify-between">
          <OrderItems items={lastOrder.items} />
          <OrderTotal value={findItemTotal(lastOrder)} />
        </div>
      </div>
    </Wrapper>
  )
}

Content.propTypes = {
  lastOrder: userLastOrderType,
}

export default Content
