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
