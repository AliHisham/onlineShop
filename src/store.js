import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  AddNewProductReducer,
  UpdateProductReducer,
  DeleteProductReducer,
  carouselProductsReducer,
} from "./reducers/productListReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  loginReducer,
  RegisterReducer,
  GetUserDetailsReducer,
  UpdateProfileReducer,
  GetAllUsersReducer,
  DeleteUserReducer,
  EditUserAdminReducer,
  UpdateUserAdminReducer,
} from "./reducers/loginReducer";
import {
  OrderReducer,
  OrderDetailsReducer,
  OrderPaymentUpdateReducer,
  UserOrders,
  GetAllOrders,
  UpdateOrder,
} from "./reducers/Orderreducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  login: loginReducer,
  register: RegisterReducer,
  details: GetUserDetailsReducer,
  update: UpdateProfileReducer,
  orderDetails: OrderReducer,
  order: OrderDetailsReducer,
  updatePayment: OrderPaymentUpdateReducer,
  orders: UserOrders,
  allUsers: GetAllUsersReducer,
  deleteUser: DeleteUserReducer,
  adminEdit: EditUserAdminReducer,
  updateUserAdmin: UpdateUserAdminReducer,
  addProduct: AddNewProductReducer,
  updateProduct: UpdateProductReducer,
  deleteProduct: DeleteProductReducer,
  allOrders: GetAllOrders,
  updateOrderAdmin: UpdateOrder,
  carousel: carouselProductsReducer,
});
const cartFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const loginInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialShippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialPayment = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;
const initialState = {
  cart: {
    cartItems: cartFromLocalStorage,
    shippingAddress: initialShippingAddress,
    paymentMethod: initialPayment,
  },
  login: { userInfo: loginInfo },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
