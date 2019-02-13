/* eslint-env jest */
import { equals } from 'ramda'

import { buildItemsWithOptions, separateParentChildren, sumTotalPricePerUnit } from '../attachments'
import lastOrderMock from '../__mock__/lastOrderMock.json'
import productOrderSnapshot from '../__mock__/productOrderSnapshot.json'

it('build buy button products with assembly options properly', () => {
  const productItems = buildItemsWithOptions(lastOrderMock.items)
  expect(productItems.length).toBe(1)
  expect(productItems[0].options.length).toBe(4)
  expect(equals(productItems, productOrderSnapshot)).toBe(true)
})

it('should sum price of parent with its children', () => {
  const [_, assemblyoptions] = separateParentChildren(lastOrderMock.items)
  const pepperoniWholePrice = sumTotalPricePerUnit(assemblyoptions, 0, lastOrderMock.items[0])
  expect(pepperoniWholePrice).toBe(1600)
})