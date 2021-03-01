export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return { loading: true, ...state };
    case "CREATE_ORDER_SUCCESS":
      return { loading: false, succes: true, order: action.payload };
    case "CREATE_ORDER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
