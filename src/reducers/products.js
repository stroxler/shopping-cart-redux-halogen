import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART, RESET_CART, ADD_ALL_TO_CART } from '../constants/ActionTypes'

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    case RESET_CART:
      return {
        ...action.products.reduce((obj, product) => {
          obj[product.id] = {
            ...obj[product.id],
            inventory: product.inventory + product.quantity,
          }
          return obj
        }, {...state})
      }
    case ADD_ALL_TO_CART:
      return {
        ...action.products.reduce((obj, product) => {
          obj[product.id] = {
            ...obj[product.id],
            inventory: 0,
          }
          return obj
        }, {...state})
      }
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          // what is this? This is a "computed property"; to my eyes it's kind
          // of a silly syntactical thing needed because of how javascript handles
          // object keys. If we were to not put the `productId` inside brackets, then
          // javascript would interpret it the same as `"productId": products(state...`,
          // i.e. it would put in a string key. For example, we did that with
          // `inventory` up above.
          //
          // in this case, we have a *variable* `productId` and we want to use it as the
          // key; javascript needs some way of knowing this, and square brackets are the
          // convention (since arrays aren't hashable, there's no confusion about meaning)
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, id) => {
  return state.byId[id]
}

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))
