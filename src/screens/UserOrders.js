import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../actions/OrderAction";
import Loader from "../components/Spinner";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserOrders = ({ match }) => {
  const { loading, orders } = useSelector((state) => {
    return state.orders;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          <Row className='justify-content-md-center mt-5'>
            <Col md={12} sm={12}>
              <h1>MY ORDERS</h1>
              {orders ? (
                <Table striped bordered responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>date</th>
                      <th>total</th>
                      <th>paid</th>
                      <th>delivered</th>
                      <th>details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => {
                      return (
                        <tr key={o._id}>
                          <td>{o._id}</td>
                          <td>{o.createdAt.substring(0, 10)}</td>
                          <td>{o.totalPrice}</td>
                          <td>
                            {o.isPaid ? (
                              <p>paid at: {o.paidAt.substring(0, 10)} </p>
                            ) : (
                              <p className='text-danger'>not paid</p>
                            )}
                          </td>
                          <td>
                            {o.isDelivered ? (
                              <p>
                                delivered at: {o.deliveredAt.substring(0, 10)}
                              </p>
                            ) : (
                              <p className='text-danger'>not delivered</p>
                            )}
                          </td>
                          <td>
                            <Link to={"/order/" + o._id}>
                              <Button
                                variant='primary'
                                className='btn btn-sm'
                                onClick={() => {
                                  dispatch({ type: "GET_ORDER_RESET" });
                                }}
                              >
                                DETAILS
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <p>there is no orderrs to display</p>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default UserOrders;
