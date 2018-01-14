import React from 'react'
import PropTypes from 'prop-types'

const ProductsList = ({ title, children, onAddAllToCartClicked }) => (
  <div>
    <h3>{title}</h3>
    <div>{children}</div>
    <button onClick={onAddAllToCartClicked}>
      Add all items to cart
    </button>
  </div>
)

ProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onAddAllToCartClicked: PropTypes.func,
}

export default ProductsList
