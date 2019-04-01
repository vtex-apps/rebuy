import React, { memo } from 'react'
import { string, number } from 'prop-types'
import { head } from 'ramda'

import rebuy from '../rebuy.css'

const httpRegex = new RegExp(/http:\/\//)

export function toHttps(url) {
  return url.replace(httpRegex, 'https://')
}

const correctImageUrl = (imageUrl, size) => {
  const urlSplitted = imageUrl.split('/')
  const idsStringIdx = urlSplitted.findIndex(content => content === 'ids')
  if (idsStringIdx < 0 || idsStringIdx === urlSplitted.length - 1) return imageUrl
  const sizeStringIdx = idsStringIdx + 1
  const sizeString = urlSplitted[sizeStringIdx]
  const imageId = head(sizeString.split('-'))
  const newSizeString = `${imageId}-${size * 2}-auto`
  return [...urlSplitted.slice(0, sizeStringIdx), newSizeString, ...urlSplitted.slice(sizeStringIdx+1)].join('/')
}

const ItemImage = ({ imageUrl, size }) => (
  <img
    width={size}
    height={size}
    className={`${rebuy.itemImage}`}
    src={correctImageUrl(toHttps(imageUrl), size)}
  />
)

ItemImage.propTypes = {
  imageUrl: string.isRequired,
  size: number.isRequired,
}

export default memo(ItemImage)