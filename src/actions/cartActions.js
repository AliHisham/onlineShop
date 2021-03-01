import axios from "axios";

export const cartActions = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get("http://localhost:5000/product/" + id);
  console.log("dataaa from action", data);
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      product: data._id,
      image: data.image,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const ShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: "ADD_SHIPPING_ADDRESS",
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const ChoosePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: "CHOOSE_PAYMENT_METHOD",
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
