import axios from "axios";

export const addProductAction = (values) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_PRODUCT_REQUEST" });
    const { data } = await axios.post(
      "http://localhost:5000/createProduct",
      values
    );
    dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ADD_PRODUCT_FAIL", payload: error });
  }
};
export const updateProductAction = (id, values) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });
    const { data } = await axios.put(
      "http://localhost:5000/editProduct/" + id,
      values
    );
    dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_PRODUCT_FAIL", payload: error });
  }
};
export const DeleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" });
    const { data } = await axios.delete(
      "http://localhost:5000/deleteProduct/" + id
    );
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: error });
  }
};

export const carouselProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "CAROUSEL_LIST_REQUEST" });
    const { data } = await axios.get("http://localhost:5000/carouselproducts");
    dispatch({ type: "CAROUSEL_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CAROUSEL_LIST_FAIL", payload: error });
  }
};
