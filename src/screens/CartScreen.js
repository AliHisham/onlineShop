import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../actions/cartActions";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import RemoveCart from "../actions/removeCart";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  console.log(productId, "ali heshamm");
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => {
    return state.cart;
  });
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  console.log("lala", cartItems);
  useEffect(() => {
    dispatch(cartActions(productId, qty));
  }, [dispatch, productId, qty]);
  const removeFromCart = (id) => {
    console.log("REMOVEEEEE");
    dispatch(RemoveCart(id));
  };
  const checkout = () => {
    if (userInfo) {
      history.push("/shipping");
    } else {
      history.push("/login", { from: "/cart/:id?" });
    }
  };
  return (
    <Row>
      <Col md={8}>
        <h2>shopping cart</h2>
        {cartItems.length === 0 ? (
          <h3>your cart is empty</h3>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            cartActions(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCart(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <br></br>
            <Button onClick={checkout} type='button' variant='primary'>
              PROCEED TO CHEK OUT
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
