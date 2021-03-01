import axios from "axios";

export const OrderAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const { result } = await axios.post(
      "http://localhost:5000/create/order",
      data
    );
    console.log(result, "ali hesham from order action");
    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: result });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_FAIL", payload: error });
  }
};
