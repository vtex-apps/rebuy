import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { prop, path } from 'ramda'
import { Link } from 'vtex.render-runtime'
import ProductPrice from 'vtex.store-components/ProductPrice'

// const OrderItems = ({ items = [] }) => (
//   <ul className="vtex-rebuy__items list ma0 pa0">
//     {items.map(item => (
//       <li
//         key={prop('uniqueId', item)}
//         className="vtex-rebuy__item flex justify-between pt3 bb b--muted-4"
//       >
//         <div className="vtex-rebuy__item-column flex-shrink-0 mr5">
//           <Link className="link c-muted-1" to={path(['detailUrl'], item)}>
//             <img
//               height="64"
//               width="64"
//               className="vtex-rebuy__item-img"
//               src={prop('imageUrl', item)}
//             />
//           </Link>
//         </div>
//         <div className="vtex-rebuy__item-column flex-auto">
//           <div className="vtex-rebuy__item-details flex justify-between items-center h-100 b">
//             <Link className="link t-heading-5 c-on-base" to={path(['detailUrl'], item)}>
//               <span className="vtex-rebuy__item-details">{`${prop(
//                 'quantity',
//                 item
//               )}x ${prop('name', item)}`}</span>
//             </Link>
//             <span className="vtex-rebuy__item-price ">
//               <ProductPrice
//                 sellingPriceClass="c-on-base t-heading-5"
//                 sellingPrice={prop('sellingPrice', item) / 100}
//                 showListPrice={false}
//                 showLabels={false}
//               />
//             </span>
//           </div>
//         </div>
//       </li>
//     ))}
//   </ul>
// )

const OrderItems = ({ items = [] }) => (
  <ul className="vtex-rebuy__items list ma0 pa0">
    {items.map(item => (
      <li
        key={prop('uniqueId', item)}
        className="vtex-rebuy__item flex justify-between pt3 bb b--muted-4"
      >
        <div className="vtex-rebuy__item-column flex-shrink-0 mr5">
          <Link className="link c-muted-1" to={path(['detailUrl'], item)}>
            <img
              height="64"
              width="64"
              className="vtex-rebuy__item-img"
              src={prop('imageUrl', item)}
            />
          </Link>
        </div>
        <div className="vtex-rebuy__item-column flex-auto">
          {/* <div className="vtex-rebuy__item-details flex flex-column justify-center h-100"> */}
          <div className="vtex-rebuy__item-details flex justify-center justify-between-ns items-center-ns flex-column flex-row-ns h-100">
            <Link className="link t-body t-heading-5-ns c-on-base" to={path(['detailUrl'], item)}>
              <span className="vtex-rebuy__item-details">{`${prop(
                'quantity',
                item
              )}x ${prop('name', item)}`}</span>
            </Link>
            <span className="vtex-rebuy__item-price ">
              <ProductPrice
                sellingPriceClass="c-on-base t-body t-heading-5-ns b-s"
                sellingPrice={prop('sellingPrice', item) / 100}
                showListPrice={false}
                showLabels={false}
              />
            </span>
          </div>
        </div>
      </li>
    ))}
  </ul>
)

OrderItems.propTypes = {
  items: arrayOf(
    shape({
      uniqueId: string.isRequired,
      imageUrl: string.isRequired,
      quantity: number.isRequired,
      sellingPrice: number.isRequired
    })
  )
}

export default OrderItems
