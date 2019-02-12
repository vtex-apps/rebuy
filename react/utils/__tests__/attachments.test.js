/* eslint-env jest */
import { equals } from 'ramda'

import { buildItemsWithOptions, separateParentChildren, sumTotalPricePerUnit } from '../attachments'
import lastOrderMock from '../__mock__/lastOrderMock.json'

const snapshot = [{"skuId":"0","quantity":1,"seller":"1","options":[{"assemblyId":"Pepperoni - Small_Basic Toppings","id":"1","quantity":1,"seller":"1"},{"assemblyId":"Pepperoni - Small_Basic Toppings","id":"2","quantity":1,"seller":"1"},{"assemblyId":"Pepperoni - Small_Crust","id":"2","quantity":1,"seller":"1"},{"assemblyId":"Pepperoni - Small_Toppings","id":"1","quantity":2,"seller":"1"}],"price":14,"name":"Pepperoni small","brand":"Pizza"}]

it('build buy button products with assembly options properly', () => {
  const productItems = buildItemsWithOptions(lastOrderMock.items)
  expect(productItems.length).toBe(1)
  expect(productItems[0].options.length).toBe(4)
  expect(equals(productItems, snapshot)).toBe(true)
})

it('should sum price of parent with its children', () => {
  const [_, assemblyoptions] = separateParentChildren(lastOrderMock.items)
  const pepperoniWholePrice = sumTotalPricePerUnit(assemblyoptions, 0, lastOrderMock.items[0])
  expect(pepperoniWholePrice).toBe(16)
})