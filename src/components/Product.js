import React from 'react'
import PropTypes from 'prop-types'

import { formatJs, logPrice } from '../purs/Product'
import { Nothing, Just } from '../purs/Data.Maybe'

const Product = ({ price, quantity, title }) => {
  let incrementedString = logPrice(price)()
  console.log("The output of our Eff call was: ", incrementedString)
  let q = quantity ? Just.create(quantity) : Nothing.value
  return <div>
           { formatJs(title, price, q) }
         </div>
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string
}

export default Product
