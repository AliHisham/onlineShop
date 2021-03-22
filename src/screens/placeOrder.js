import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Image, ListGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckSteps from "../components/ChekoutSteps";
import { OrderAction } from "../actions/OrderAction";

const PlaceOrder = ({ history }) => {
  const cartState = useSelector((state) => {
    return state.cart;
  });
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  const orderCreate = useSelector((state) => {
    return state.orderDetails;
  });
  const { order, success } = orderCreate;
  const dispatch = useDispatch();

  const { shippingAddress, paymentMethod, cartItems } = cartState;
  var ItemsPrice = cartItems.reduce(
    (qty, item) => qty + item.price * item.qty,
    0
  );
  var taxPrice = Number(0.15 * ItemsPrice).toFixed(2);
  var shippingPrice = ItemsPrice > 100 ? 0 : 100;
  var totalPrice = Number(
    Number(ItemsPrice) + Number(taxPrice) + Number(shippingPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push("/order/" + order._id);
    }
  }, [history, success]);

  const createOrderr = () => {
    dispatch(
      OrderAction({
        user: userInfo.id,
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      })
    );
    console.log("a7aaaaa");
  };

  return (
    <>
      <CheckSteps step1 step2 step3 step4></CheckSteps>
      <br></br>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Method:</strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>order:</h2>
              {cartItems.length === 0 ? (
                <p className='text-danger'>your cart is empty</p>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((c, i) => {
                    console.log(c, "ali is checking");
                    return (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col md={2}>
                            <Image
                              fluid
                              rounded
                              src={c.image}
                              alt={c.name}
                            ></Image>
                          </Col>
                          <Col>
                            <Link to={"/product/" + c.product}>{c.name}</Link>
                          </Col>
                          <Col md={4}>
                            {c.qty} x ${c.price} = ${" "}
                            {Number(c.qty * c.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>Items Price:${Number(ItemsPrice).toFixed(2)}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>Shipping Price: ${shippingPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>Tax Price:${taxPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <p>Total Price:${totalPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={createOrderr}
                  variant='primary'
                  className='btn btn-block'
                >
                  ORDER
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
