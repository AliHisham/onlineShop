import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import { RegisterAction } from "../actions/loginAction";
import Spinner from "../components/Spinner";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("enter your name"),
  email: Yup.string().required("enter your email").email("invalid email"),
  password: Yup.string().required("enter your password"),
});

const initial = {
  name: "",
  email: "",
  password: "",
};

const Register = ({ location, history }) => {
  const dispatch = useDispatch();
  const RegisterRed = useSelector((state) => {
    return state.register;
  });
  const [hide, setHide] = useState(true);

  const { userInfo, loading, error } = RegisterRed;
  useEffect(() => {
    if (error) {
      setHide(false);
    } else if (userInfo) {
      history.push("/");
    }
  }, [userInfo, error, history]);

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col md={6} xs={12}>
          <h1>REGISTER</h1>
          <hr></hr>
          <Formik
            validationSchema={RegisterSchema}
            initialValues={initial}
            enableReinitialize={true}
            onSubmit={(values, { resetForm, ...otherProps }) => {
              dispatch(
                RegisterAction(values.name, values.email, values.password)
              );
            }}
          >
            {({ errors, touched, dirty, isValid, isValidating }) => {
              return (
                <Form>
                  {loading && <Spinner></Spinner>}
                  <p className='text-danger' hidden={hide}>
                    this email already exists
                  </p>
                  <label>name</label>
                  <Field name='name' className='form-control'></Field>
                  {errors.name && touched.name ? (
                    <p className='text-danger'>{errors.name}</p>
                  ) : null}
                  <label>email</label>
                  <Field name='email' className='form-control'></Field>
                  {errors.email && touched.email ? (
                    <p className='text-danger' type='email'>
                      {errors.email}
                    </p>
                  ) : null}
                  <label>password</label>
                  <Field
                    type='password'
                    name='password'
                    className='form-control'
                  ></Field>
                  {errors.password && touched.password ? (
                    <p className='text-danger'>{errors.password}</p>
                  ) : null}
                  <button
                    className='btn btn-primary  mt-4'
                    type='submit'
                    disabled={
                      errors.name || errors.email || errors.password
                        ? true
                        : false
                    }
                  >
                    REGISTER
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
