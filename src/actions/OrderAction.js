import axios from "axios";

export const OrderAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const { data } = await axios.post(
      "http://localhost:5000/create/order",
      order
    );
    console.log(data, "ali hesham from order action");
    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_FAIL", payload: error });
  }
};

export const GetOrderDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ORDER_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/order/" + id);
    dispatch({ type: "GET_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ORDER_FAIL", payload: error });
  }
};

export const updateOrderPayment = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });
    const { data } = await axios.put(
      "http://localhost:5000/updateorder/" + id,
      paymentResult
    );
    console.log(data, "ali hesham from update action");
    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_ORDER_FAIL", payload: error });
  }
};

export const getUserOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_ORDER_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/userOrders/" + id);
    dispatch({ type: "GET_USER_ORDER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDER_FAIL", payload: error });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_ORDERS_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/allorders");
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDERS_FAIL", payload: error });
  }
};

export const UpdateOrder = (id, values) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_ADMIN_REQUEST" });
    const { data } = await axios.put(
      "http://localhost:5000/updateOrderAdmin/" + id,
      values
    );
    dispatch({ type: "UPDATE_ORDER_ADMIN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_ORDER_ADMIN_FAIL", payload: error });
    console.log(error, "ali hesham ");
  }
};
