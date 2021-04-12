import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Spinner";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllOrders } from "../actions/OrderAction";

const AllOrders = ({ history }) => {
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  const dispatch = useDispatch();
  const { loading, orders } = useSelector((state) => {
    return state.allOrders;
  });
  useEffect(() => {
    if (!userInfo.type) {
      history.push("/");
    }
    dispatch(getAllOrders());
    dispatch({ type: "UPDATE_ORDER_ADMIN_RESET" });
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          <Row className='justify-content-md-center mt-5'>
            <Col md={12} sm={12}>
              <Table striped bordered responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>PAID</th>
                    <th>Price</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => {
                    return (
                      <tr key={o._id}>
                        <td>{o._id}</td>
                        <td>{o.createdAt.substring(0, 10)}</td>
                        <td>
                          {" "}
                          {o.isPaid ? (
                            <p>paid at: {o.paidAt.substring(0, 10)} </p>
                          ) : (
                            <p className='text-danger'>not paid</p>
                          )}
                        </td>
                        <td>{o.totalPrice}</td>
                        {/* <td>
                          {" "}
                          {o.isDelivered ? (
                            <p>
                              delivered at: {o.deliveredAt.substring(0, 10)}
                            </p>
                          ) : (
                            <p className='text-danger'>not delivered</p>
                          )}
                        </td> */}
                        <td>
                          {" "}
                          {o.isDelivered ? (
                            <p className='text-success'>DELIVERED</p>
                          ) : (
                            <Link to={"/orderedit/" + o._id}>
                              <i className='fas fa-edit'></i>
                            </Link>
                          )}{" "}
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

export default AllOrders;
