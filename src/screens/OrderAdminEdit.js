import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Spinner";
import { Formik, Form, Field } from "formik";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { GetOrderDetailsAction, UpdateOrder } from "../actions/OrderAction";

const OrderAdminEdit = ({ match, history }) => {
  const { order, loading } = useSelector((state) => {
    return state.order;
  });
  const dispatch = useDispatch();
  const { success } = useSelector((state) => {
    return state.updateOrderAdmin;
  });
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  useEffect(() => {
    if (!userInfo.type) {
      history.push("/");
    }
    dispatch(GetOrderDetailsAction(match.params.id));
  }, [dispatch, match.params.id, success]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          <Row>{success && <Alert variant='success'>order updated</Alert>}</Row>
          <Row className='justify-content-md-center mt-5'>
            <Row>
              <Col>
                <h2>ORDER_ID:{order?._id}</h2>
              </Col>
            </Row>
            <Col md={12} sm={12}>
              <Formik
                enableReinitialize
                initialValues={order}
                onSubmit={(values) => {
                  console.log(values.isDelivered);
                  dispatch(UpdateOrder(match.params.id, values));
                }}
              >
                {({ errors, touched, dirty, isValid, isValidating }) => {
                  return (
                    <Form>
                      <label className='mt-3'>
                        <Field type='checkbox' name='isDelivered' />
                        Delivered
                      </label>
                      <Button
                        variant='primary'
                        className='mt-3 btn btn-block'
                        type='submit'
                      >
                        Update
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default OrderAdminEdit;
