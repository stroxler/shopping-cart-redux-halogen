import React from 'react'
import PropTypes from 'prop-types'

import { Nothing, Just } from '../purs2js/Data.Maybe'
import { runComponent, runFromJs } from '../purs2js/Product'
import { runAff } from '../purs2js/Control.Monad.Aff'

class React2HalogenProduct extends React.Component {

  initialize(props) {

    // What's going on here?
    //  We don't learn a ton about halogen specifically by looking at
    //    this, but we do learn something about the js / purescript
    //    interface.
    //  The runComponent function in Product returns an Aff, which
    //    itself has an output of State -> Aff (the finer points of
    //    what kind of Aff are irrelevant from a js interop perspective)
    //  In order to avoid needing to match on Either from javascript,
    //    we wrote the runFromJs, which effectively converts from Aff
    //    to a callback using Eff
    //  Look carefully at the runFromJs type. The onSuccess and onFailure
    //    have to map values / errors to `Eff eff Unit`. This means that
    //    the output has to be a thunk, which is why we return thunk.
    //    don't care much about the `a` (which is the type inside the `Aff`
    //    context)
    return (domNode) => {
      if (domNode != null) {
        let aff = props.runComponent(domNode)(props.state)
        let onSuccess = (query) => {
          console.log(query);
          this.query = query;
          return thunk }
        let onFailure = (e) => {
          console.warn(e);
          return thunk
        }
        runFromJs(aff)(onSuccess)(onFailure)()
      }
    }
  }

  componentWillReceiveProps({state}) {
    if (this.query) {

      // What's going on here?
      //  Pretty much the same thing as in initialize, except that to get the
      //    next aff we run this.query(state) instead of runComponent
      let aff = this.query(state)
      let onSuccess = (x) => {
        console.log(x)
        return thunk
      }
      let onFailure = (e) => {
        console.warn(e)
        return thunk
      }
      runFromJs(aff)(onSuccess)(onFailure)()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return <div ref={this.initialize(this.props)}></div>
  }


}

function thunk() {}

const Product = ({ price, quantity, title }) => {
  const q = quantity ? Just.create(quantity) : Nothing.value
  const state = { price, quantity: q, title }
  return <React2HalogenProduct runComponent={runComponent} state={state} />

}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string
}

export default Product
