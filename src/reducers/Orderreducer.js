export const OrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return { loading: true, ...state };
    case "CREATE_ORDER_SUCCESS":
      return { loading: false, success: true, order: action.payload };
    case "CREATE_ORDER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OrderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case "GET_ORDER_REQUEST":
      return { loading: true, ...state };
    case "GET_ORDER_SUCCESS":
      return { loading: false, order: action.payload };
    case "GET_ORDER_FAIL":
      return { loading: false, error: action.payload };
    case "GET_ORDER_RESET":
      return {};
    default:
      return state;
  }
};

export const OrderPaymentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_REQUEST":
      return { loading: true };
    case "UPDATE_ORDER_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_ORDER_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_ORDER_RESET":
      return {};
    default:
      return state;
  }
};

export const UserOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "GET_USER_ORDER_REQUEST":
      return { loading: true };
    case "GET_USER_ORDER_SUCCESS":
      return { loading: false, orders: action.payload };
    case "GET_USER_ORDER_FAIL":
      return { loading: false, error: action.payload };
    case "GET_USER_ORDER_RESET":
      return {};
    default:
      return state;
  }
};
export const GetAllOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS_REQUEST":
      return { loading: true };
    case "GET_ALL_ORDERS_SUCCESS":
      return { loading: false, orders: action.payload };
    case "GET_ALL_ORDERS_FAIL":
      return { loading: false, error: action.payload };
    case "GET_ALL_ORDERS_RESET":
      return {};
    default:
      return state;
  }
};

export const UpdateOrder = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_ADMIN_REQUEST":
      return { loading: true };
    case "UPDATE_ORDER_ADMIN_SUCCESS":
      return { loading: false, updatedOrder: action.payload, success: true };
    case "UPDATE_ORDER_ADMIN_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_ORDER_ADMIN_RESET":
      return {};
    default:
      return state;
  }
};
