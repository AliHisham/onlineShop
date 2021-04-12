import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import productListAction from "../actions/productListAction";
import Loader from "../components/Spinner";
import Carousel from "../components/Carousel";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <>
      <Carousel></Carousel>
      <h1>latest products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <h3>errorrr</h3>
      ) : (
        <Row>
          {products.map((res) => {
            return (
              <Col key={res._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={res}></Product>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
