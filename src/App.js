import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Homescreen from "./screens/HomeScreen";
import Productscreen from "./screens/Productscreen";
import CartScreen from "./screens/CartScreen";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./screens/register";
import ProfileScreen from "./screens/profileScreen";
import Shipping from "./screens/ShippingScreen";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/placeOrder";
import OrderSCreen from "./screens/OrderScreen";
import UserOrders from "./screens/UserOrders";
import AllUsersScreen from "./screens/AllUsersScreen";
import AllProducts from "./screens/AllProducts";
import AllOrders from "./screens/AllOrders";
import UsersEditScreen from "./screens/UsersEditScreen";
import AddProductScreen from "./screens/AddProductScreen";
import OrderAdminEdit from "./screens/OrderAdminEdit";

import { useSelector } from "react-redux";

function App() {
  const logged = useSelector((state) => {
    return state.login;
  });
  const { userInfo } = logged;

  console.log("VuserInfo", userInfo);
  return (
    <BrowserRouter>
      <Header></Header>
      <main className='py-3'>
        <Container>
          {/* <Guard path='/' component={Homescreen} exact /> */}
          <Route path='/' component={Homescreen} exact></Route>
          <Route path='/product/:id' component={Productscreen}></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/shipping' component={Shipping}></Route>
          <Route path='/payment' component={Payment}></Route>
          <Route path='/placeorder' component={PlaceOrder}></Route>
          <Route path='/order/:id' component={OrderSCreen}></Route>
          <Route path='/userOrders/:id' component={UserOrders}></Route>
          <Route path='/allusers' component={AllUsersScreen}></Route>
          <Route path='/allproducts' component={AllProducts}></Route>
          <Route path='/allorders' component={AllOrders}></Route>
          <Route path='/useredit/:id' component={UsersEditScreen}></Route>
          <Route path='/addproduct' exact component={AddProductScreen}></Route>
          <Route path='/addproduct/:id' component={AddProductScreen}></Route>
          <Route path='/orderedit/:id' component={OrderAdminEdit}></Route>

          <Route
            path='/profile/:id'
            render={(props) => {
              if (userInfo) {
                return <ProfileScreen {...props} />;
              } else {
                return <Redirect to={"/"} />;
              }
            }}
          ></Route>
        </Container>
      </main>

      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
