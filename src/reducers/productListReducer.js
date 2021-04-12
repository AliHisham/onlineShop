export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_LIST_FAIL":
      return { loading: false, products: [] };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case "PRODUCT_DETAILS_REQUEST":
      return { loading: true, ...state };
    case "PRODUCT_DETAILS_SUCCESS":
      return { loading: false, product: action.payload };
    case "PRODUCT_DETAILS_FAIL":
      return { loading: false, ...state };
    case "PRODUCT_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};
export const AddNewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_REQUEST":
      return { loading: true };
    case "ADD_PRODUCT_SUCCESS":
      return {
        loading: false,
        createdProduct: action.payload,
        addsuccess: true,
      };
    case "ADD_PRODUCT_FAIL":
      return { loading: false, error: action.payload };
    case "ADD_PRODUCT_RESET":
      return {};
    default:
      return state;
  }
};
export const UpdateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_REQUEST":
      return { loading: true };
    case "UPDATE_PRODUCT_SUCCESS":
      return { loading: false, updatedProduct: action.payload, success: true };
    case "UPDATE_PRODUCT_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_PRODUCT_RESET":
      return {};
    default:
      return state;
  }
};

export const DeleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT_REQUEST":
      return { loading: true };
    case "DELETE_PRODUCT_SUCCESS":
      return { loading: false, deletedProduct: action.payload, success: true };
    case "DELETE_PRODUCT_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carouselProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "CAROUSEL_LIST_REQUEST":
      return { loading: true, products: [] };
    case "CAROUSEL_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "CAROUSEL_LIST_FAIL":
      return { loading: false, products: [] };
    default:
      return state;
  }
};
