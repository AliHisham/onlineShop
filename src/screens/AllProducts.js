import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import productList from "../actions/productListAction";
import Loader from "../components/Spinner";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeleteProductAction } from "../actions/CUD_PRODUCT";
const AllProducts = ({ history }) => {
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  const { loading, products } = useSelector((state) => {
    return state.productList;
  });
  const { success } = useSelector((state) => {
    return state.deleteProduct;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo.type) {
      history.push("/");
    }
    dispatch(productList());
    dispatch({ type: "ADD_PRODUCT_RESET" });
    dispatch({ type: "UPDATE_PRODUCT_RESET" });
  }, [dispatch, success]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          <Row>
            <Col md={4}>
              <Button
                onClick={() => {
                  history.push("/addproduct");
                  dispatch({ type: "PRODUCT_DETAILS_RESET" });
                }}
              >
                ADD PRODUCT
              </Button>
            </Col>
          </Row>
          <Row className='justify-content-md-center mt-5'>
            <Col md={12} sm={12}>
              <Table striped bordered responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Count In Stock</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    return (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.brand}</td>
                        <td>{p.countInStock}</td>
                        <td>{p.price}</td>
                        <td>
                          <Link to={"/addproduct/" + p._id}>
                            <i className='fas fa-edit'></i>
                          </Link>
                          <Button
                            className='ml-3 btn-sm'
                            variant='danger'
                            onClick={() => dispatch(DeleteProductAction(p._id))}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AllProducts;
