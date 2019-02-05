import React, { Component } from 'react'
import { compose, map, path, pick, prop, propOr, values } from 'ramda'
import { contextPropTypes } from 'vtex.store-resources/OrderFormContext'
import { graphql } from 'react-apollo'

import lastUserOrder from '../queries/lastUserOrder.gql'

import Content from './Content'
import { separateParentChildren } from '../utils/attachments'

const parseOrderItemToButton = ({ id, sellingPrice, additionalInfo={}, ...rest }) =>
  ({ ...rest, skuId: id, price: sellingPrice / 100, brand: additionalInfo.brandName })

const buildItemsWithOptions = (lastItems) => {
  const [parentItems, assemblyOptions] = separateParentChildren(lastItems)

  const parentMap = parentItems.reduce((prev, curr) => 
    ({ ...prev, [curr.id]: parseOrderItemToButton(curr) }), {})

  const pickProps = pick(['skuId', 'quantity', 'seller', 'options', 'price', 'name', 'brand'])
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
  }
  state = {
    isVisible: false,
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
    const { isVisible } = this.state

    const lastOrder = path(['lastUserOrder', 'lastUserOrder'], this.props)

    if (!lastOrder) {
      return null
    }

    if (!isVisible) {
      this.triggerOpenTransition()
    }

    return (
      <Content 
        lastOrder={lastOrder} 
        products={buildItemsWithOptions(prop('items', lastOrder))} />
    )
  }
}

export default graphql(lastUserOrder, { name: 'lastUserOrder', options: {ssr: false}})(Rebuy)
