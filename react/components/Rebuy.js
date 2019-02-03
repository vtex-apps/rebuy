import React, { Component } from 'react'
import { array, bool, shape } from 'prop-types'
import { all, isNil, compose, head, map, path, pick, prop, props, propOr, values } from 'ramda'
import { Box } from 'vtex.styleguide'
import { contextPropTypes } from 'vtex.store-resources/OrderFormContext'
import { ExtensionPoint } from 'vtex.render-runtime'
import Button from 'vtex.styleguide/Button'

import Header from './Header'
import OrderItems from './OrderItems'
import Content from './Content'
import OrderTotal from './OrderTotal'
import withFetch from './withFetch'

import mock from './mock.json'

const isParentItem = item => all(isNil, props(['parentItemIndex', 'parentAssemblyBinding'], item))
const buildItemsWithOptions = (lastItems) => {
  const [parentItems, assemblyOptions] = partition(isParentItem, lastItems)

  const parentMap = parentItems.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {})
  const a = fromPairs(map(pair(prop('id'), identity), parentItems))
  const pickProps = pick(['id', 'quantity', 'seller', 'options'])
  const mapAndPick = compose(map(pickProps), values)
  return mapAndPick(
    assemblyOptions.reduce((prev, currOption) => {
      const { parentItemIndex, parentAssemblyBinding } = currOption
      const parentId = lastItems[parentItemIndex].id
      const parentObj = prev[parentId]
      const option = {
        assemblyId: parentAssemblyBinding,
        ...pick(['id', 'quantity', 'seller'], currOption),
      }
      const options = [...propOr([], 'options', parentObj), option]
      parentObj.options = options
      return {
        ...prev,
        [parentId]: parentObj,
      }
    }, parentMap)
  )
}
class Rebuy extends Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()
  }

  static propTypes = {
    orderFormContext: contextPropTypes,
    fetchContext: shape({
      loading: bool,
      data: array,
    }),
  }
  state = {
    isAddingToCart: false,
    isVisible: false,
  }

  handleClickBuy = () => {
    const { orderFormContext, fetchContext } = this.props

    const lastOrder = head(prop('data', fetchContext))

    const minicartButton = document.querySelector('.vtex-minicart .vtex-button')

    this.setState({ isAddingToCart: true })
    orderFormContext
      .addItem({
        variables: {
          orderFormId: path(['orderForm', 'orderFormId'], orderFormContext),
          items: buildItemsWithOptions(prop('items', lastOrder))
        },
      })
      .then(() => {
        this.setState({ isAddingToCart: false })
        orderFormContext.refetch().then(() => minicartButton.click())
      })
  }

  triggerOpenTransition = () => {
    setTimeout(() => {
      this.setState({
        isVisible: true,
      })

      const containerElement = this.container.current

      if (!containerElement) {
        return
      }

      const transitionDuration = 800
      // get the actual container height
      containerElement.style.height = 'auto'
      const containerHeight = containerElement.clientHeight

      // sets the height back to zero, and triggers a layout,
      // by trying to get getBoundingClientRect
      containerElement.style.height = 0
      containerElement.getBoundingClientRect()

      // sets the transition and set the height to the target value
      containerElement.style.transition = `height ${transitionDuration}ms ease-in-out`
      containerElement.style.height = `${containerHeight}px`

      // after the transition, sets the height to auto, in case the
      // content or height change
      setTimeout(() => {
        containerElement.style.height = 'auto'
      }, transitionDuration + 100)
    }, 500)
  }

  render() {
    const {
      fetchContext: { data, error, loading },
    } = this.props
    const { isAddingToCart, isVisible } = this.state

    // console.log('teste rebuy: ', JSON.stringify(data))

    // if (loading) {
    //   return null
    // }

    // if (error >= 400) {
    //   console.warn(
    //     'The "lastOrders" schema seems to be missing. Create it according to the instruction on README.'
    //   )
    //   return null
    // }

    // const lastOrder = head(data)
    const lastOrder = head(mock)

    if (!lastOrder) {
      return null
    }

    if (!isVisible) {
      this.triggerOpenTransition()
    }

    return <Content lastOrder={lastOrder} />

    return (
      <section className="vtex-rebuy vtex-page-padding overflow-hidden h0" ref={this.container}>
        <ExtensionPoint id="greeting" />
        <div className="mv4 mh4 bg-base border-box br1 bw1 ba b--light-gray">
          <div className="w-100 pa4 flex flex-column">
            <div className="t-body c-on-base">Here is your last order</div>
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={prop('value', lastOrder)} />
          </div>
        </div>
        <div className="pt5 mh5">
          <Button type="submit" onClick={() => {}} isLoading={false} block>
            <div className="flex w-100 justify-center items-center">
              <div>Add to cart</div>
            </div>
          </Button>
        </div>
      </section>
    )

    return (
      <section className="vtex-rebuy vtex-page-padding overflow-hidden h0" ref={this.container}>
        <div className="mv4 mh6 bg-base border-box br1 bw1 ba b--light-gray">
          <div className="w-100 pv6 ph4 flex">
            <div className="w-third">
              <ExtensionPoint id="greeting" />
              <div className="t-body ml4">Here is your last order</div>
              <div className="pt7">
                <Button type="submit" onClick={() => {}} isLoading={false} block>
                  <div className="flex w-100 justify-center items-center">
                    <div>Add to cart</div>
                  </div>
                </Button>
              </div>
            </div>
            <div className="mh6 ba b--muted-4" style={{ width: '1px' }}/>
            <div className="w-two-thirds">
              <OrderItems items={prop('items', lastOrder)} />
              <OrderTotal value={prop('value', lastOrder)} />
            </div>
          </div>
        </div>
        {/* <ExtensionPoint id="greeting" /> */}
        {/* <Header onClickBuy={this.handleClickBuy} loading={isAddingToCart} /> */}
        {/* <div className="vtex-rebuy__box">
          <Box>
            <OrderItems items={prop('items', lastOrder)} />
            <OrderTotal value={prop('value', lastOrder)} />
          </Box>
        </div> */}
      </section>
    )
  }
}

export default withFetch(Rebuy)
