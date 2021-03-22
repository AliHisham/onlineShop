import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOrderDetailsAction,
  updateOrderPayment,
} from "../actions/OrderAction";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Row,
  Col,
  Button,
  Image,
  ListGroup,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Spinner";
import axios from "axios";

const OrderScreen = ({ match }) => {
  const [sdkReady, setSdk] = useState(false);
  const dispatch = useDispatch();
  const OrderDetails = useSelector((state) => {
    return state.order;
  });
  const OrderUpdate = useSelector((state) => {
    return state.updatePayment;
  });
  const { loading: paymentload, success: successPay } = OrderUpdate;
  const { loading, order } = OrderDetails;
  useEffect(() => {
    const getPayypalId = async () => {
      const { data } = await axios.get("http://localhost:5000/paypal");
      const script = document.createElement("script");
      console.log(data, "iddddddddddddddddddddddddd");
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };
    console.log(order, "orderrrrrrrrrrrrr");
    if (!order || successPay) {
      dispatch({ type: "UPDATE_ORDER_RESET" });
      dispatch(GetOrderDetailsAction(match.params.id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        getPayypalId();
      } else {
        setSdk(true);
      }
    }

    // if (!order?.isPaid) {
    //   if (!window.paypal) {
    //     getPayypalId();
    //   } else {
    //     setSdk(true);
    //   }
    // }
  }, [match.params.id, dispatch, order, successPay]);
  const paymentHandler = (paymentResult) => {
    console.log(paymentResult, "paypallllllllllll");
    dispatch(updateOrderPayment(match.params.id, paymentResult));
  };
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>ORDER ID:{order?._id}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong>
                  {order?.shippingAddress.address},{" "}
                  {order?.shippingAddress.city},{" "}
                  {order?.shippingAddress.postalCode},
                  {order?.shippingAddress.country}
                </p>
                {order?.isDeliverd ? (
                  <Alert variant='success'>Deliverd successfully</Alert>
                ) : (
                  <Alert variant='danger'>not deliverd</Alert>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <p>
                  Payment Method
                  <strong>Method: {order?.paymentMethod}</strong>
                </p>

                {order?.isPaid ? (
                  <Alert variant='success'>paid successfully</Alert>
                ) : (
                  <Alert variant='danger'>order is not paid</Alert>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>order:</h2>

                <ListGroup variant='flush'>
                  {order?.orderItems.map((c, i) => {
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
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h2>Order Summary</h2>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <p>Shipping Price: ${order?.shippingPrice}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <p>Tax Price:${order?.taxPrice}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <p>Total Price:${order?.totalPrice}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order?.isPaid && (
                  <ListGroup.Item>
                    {loading && <Loader></Loader>}
                    {!sdkReady ? (
                      <Loader></Loader>
                    ) : (
                      <PayPalButton
                        amount={order?.totalPrice}
                        onSuccess={paymentHandler}
                        onError={(err) => {
                          return console.log(err, "paypalll erroorr");
                        }}
                      ></PayPalButton>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderScreen;
