import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

import { logPrice, formatJs } from '../purs2js/ProductFormatting'
import { Nothing, Just } from '../purs2js/Data.Maybe'


const Cart  = ({ products, total, onCheckoutClicked, onResetClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product => {
      // When we made a halogen component to replace Product, we moved all
      // of the baseic purescript-side interop example code into
      // the ProductJsTooling purescript module, and the examples of calling
      // it from js into here.
      let incrementedString = logPrice(product.price)()
      console.log("The output of our Eff call was: ", incrementedString)
      let q = product.quantity ? Just.create(product.quantity) : Nothing.value
      console.log("The output of formatting quantity is: ",
                  formatJs(product.title, product.price, q))
      // Everything above is just to exercise some example js interop,
      // this is the important thing
      return <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    }
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
      <button onClick={onResetClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Reset Cart
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  onResetClicked: PropTypes.func,
}

export default Cart
