import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Spinner";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  EditUserAdminAction,
  UpdateUserAdminAction,
} from "../actions/loginAction";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const updateUserSchema = Yup.object().shape({
  name: Yup.string().required("enter your name"),
  email: Yup.string().required("enter your email"),
  isAdmin: Yup.boolean(),
});

const UsersEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { theUser, loading } = useSelector((state) => {
    return state.adminEdit;
  });
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  const { success, user } = useSelector((state) => {
    return state.updateUserAdmin;
  });

  useEffect(() => {
    if (!userInfo.type) {
      history.push("/");
    }
    dispatch(EditUserAdminAction(match.params.id));
  }, [dispatch, match.params.id, success]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Container>
          <Button
            onClick={() => {
              dispatch({ type: "ADMIN_UPDATE_USER_RESET" });
              history.push("/allusers");
            }}
          >
            go Back
          </Button>
          <Row className='justify-content-md-center mt-5'>
            {success && <Alert variant='success'>updated succefully</Alert>}
            <Col md={12} sm={12}>
              <Formik
                enableReinitialize
                validationSchema={updateUserSchema}
                initialValues={theUser}
                onSubmit={(values) => {
                  console.log(values);
                  dispatch(UpdateUserAdminAction(match.params.id, values));
                }}
              >
                {({ errors, touched, dirty, isValid, isValidating }) => {
                  return (
                    <Form>
                      <label>name</label>
                      <Field name='name' className='form-control'></Field>
                      {errors.name && touched.name ? (
                        <p className='text-danger'>{errors.name}</p>
                      ) : null}

                      <label>email</label>
                      <Field name='email' className='form-control'></Field>
                      {errors.email && touched.email ? (
                        <p className='text-danger'>{errors.email}</p>
                      ) : null}

                      <label className='mt-3'>
                        <Field type='checkbox' name='isAdmin' />
                        Admin
                      </label>
                      <Button
                        variant='primary'
                        className='btn btn-block'
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

export default UsersEditScreen;
