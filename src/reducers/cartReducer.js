export const cartReducer = (
  state = { shippingAddress: {}, cartItems: [], paymentMethod: "" },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const sameItem = state.cartItems.find((x) => {
        return x.product === item.product;
      });
      if (sameItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === sameItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case "ADD_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case "CHOOSE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
