import { all, isNil, partition, props } from 'ramda'

const isParentItem = item => all(isNil, props(['parentItemIndex', 'parentAssemblyBinding'], item))

export const separateParentChildren = (items) => partition(isParentItem, items)
