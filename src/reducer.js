import {
  CLEAR_CART,
  DECREASE,
  GET_TOTALS,
  INCREASE,
  REMOVE,
  TOGGLE_AMOUNT,
} from "./actions";
import cartItems from "./cart-items";

//intial state
const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};

const reducer = (state = initialStore, action) => {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [], amount: 0 };
  }
  if (action.type === INCREASE) {
    const tempCart = state.cart.map((cartItem) => {
      if (action.payload.id === cartItem.id) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === DECREASE) {
    const tempCart = state.cart.map((cartItem) => {
      if (action.payload.id === cartItem.id) {
        return { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => {
        return cartItem.id !== action.payload.id;
      }),
    };
  }
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemPrice = price * amount;
        cartTotal.amount += cartItem.amount;
        cartTotal.total += itemPrice;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.toggle === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.toggle === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      }),
    };
  }
  return state;
};
export default reducer;
