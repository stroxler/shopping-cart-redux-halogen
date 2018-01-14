import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, quantity, title }) => {
  return <div>
           {title} - ${price} {quantity ? " x " + quantity : ""}
         </div>
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string
}

export default Product
