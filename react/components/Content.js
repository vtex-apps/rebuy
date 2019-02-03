import React, { Component, Fragment } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { prop } from 'ramda'
import Button from 'vtex.styleguide/Button'
import { ExtensionPoint } from 'vtex.render-runtime'

import OrderItems from './OrderItems'
import OrderTotal from './OrderTotal'

const Wrapper = ({children}) => (
  <div className="mv4 mh4 mh6-ns bg-base border-box br1 bw1 ba b--light-gray">
    {children}
  </div>
)

const LastOrderLabel = () => <div className="t-body c-on-base ml4-ns">Here is your last order</div>
  
const AddButton = ({onClick, isLoading}) => (
  <div className="pt5 pt7-ns mh5">
    <Button type="submit" onClick={onClick} isLoading={isLoading} block>
      <div className="flex w-100 justify-center items-center ttu">
        <div className="t-body">Add to cart</div>
      </div>
    </Button>
  </div>
)

class Content extends Component {

  renderMobile = () => {
    const { lastOrder } = this.props

    return (
      <Fragment>
        <ExtensionPoint id="greeting" />
        <Wrapper>
          <div className="w-100 pa4 flex flex-column">
            <LastOrderLabel />
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={prop('value', lastOrder)} />
          </div>
        </Wrapper>
        <AddButton onClick={() => {}} isLoading={false} />
      </Fragment> 
    )
  }

  render() {
    const { lastOrder } = this.props

    if (isMobileOnly) { return this.renderMobile() }

    return (
      <Wrapper>
        <div className="w-100 pv6 ph4 flex">
          <div className="w-third">
            <ExtensionPoint id="greeting" />
            <LastOrderLabel />
            <AddButton onClick={() => {}} isLoading={false} />
          </div>
          <div className="mh6 ba b--muted-4" style={{ width: '1px' }} />
          <div className="w-two-thirds flex flex-column justify-between">
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={prop('value', lastOrder)} />
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Content