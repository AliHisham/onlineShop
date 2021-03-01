import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import productDetailss from "../actions/productDetailsAction";
import Loader from "../components/Spinner";

const Productscreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => {
    return state.productDetails;
  });
  const { loading, product } = productDetails;

  useEffect(() => {
    dispatch(productDetailss(match.params.id));
  }, [dispatch, match.params.id]);

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className='btn btn-light' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "in-stock" : "out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>qty</Col>
                      <Col>
                        {" "}
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCart}
                    className='btn btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    {" "}
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Productscreen;
