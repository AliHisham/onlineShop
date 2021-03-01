import axios from "axios";

const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/product/" + id);
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error });
  }
};

export default productDetails;
