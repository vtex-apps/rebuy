import { all, compose, filter, isNil, map, partition, pick, propEq, propOr, props, values } from 'ramda'

export const isParentItem = item => all(isNil, props(['parentItemIndex', 'parentAssemblyBinding'], item))

export const separateParentChildren = (items) => partition(isParentItem, items)

const parseOrderItemToButton = ({ id, sellingPrice, additionalInfo={}, ...rest }) =>
  ({ ...rest, skuId: id, price: sellingPrice / 100, brand: additionalInfo.brandName })

export const buildItemsWithOptions = (lastItems) => {
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

const isSonOfIndex = (index) => propEq('parentItemIndex', index)

export const sumTotalPricePerUnit = (assemblyOptions, parentIndex, parentItem) => {
  const children = filter(isSonOfIndex(parentIndex), assemblyOptions)
  return children.reduce(
    (total, item) => total + item.sellingPrice * item.quantity / parentItem.quantity,
    parentItem.sellingPrice
    )
}
