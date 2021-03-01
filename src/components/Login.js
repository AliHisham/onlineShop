import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/loginAction";
import { Container, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string().required("enter your email"),
  password: Yup.string().required("enter your password"),
});

const initial = {
  email: "",
  password: "",
};

const Login = ({ location, history }) => {
  const dispatch = useDispatch();
  const userRed = useSelector((state) => {
    return state.login;
  });
  const [hide, setHide] = useState(true);

  const { userInfo, loading, error } = userRed;
  console.log(error, "aaa");
  let h = useHistory();
  useEffect(() => {
    if (userInfo) {
      h.goBack();
    } else if (error) {
      setHide(false);
    }
    console.log("history", history);
  }, [hide, error, userInfo, h, history]);

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col md={6} xs={12}>
          <h1>SIGN IN</h1>
          <hr></hr>
          <Formik
            validationSchema={loginSchema}
            initialValues={initial}
            enableReinitialize={true}
            onSubmit={(values, { resetForm, ...otherProps }) => {
              dispatch(loginAction(values.email, values.password));
            }}
          >
            {({ errors, touched, dirty, isValid, isValidating }) => {
              return (
                <Form>
                  <p className='text-danger' hidden={hide}>
                    invalid email or password
                  </p>
                  {loading && <Spinner></Spinner>}
                  <label>email</label>
                  <Field name='email' className='form-control'></Field>
                  {errors.email && touched.email ? (
                    <p className='text-danger'>{errors.email}</p>
                  ) : null}
                  <label>password</label>
                  <Field
                    name='password'
                    type='password'
                    className='form-control'
                  ></Field>
                  {errors.password && touched.password ? (
                    <p className='text-danger'>{errors.password}</p>
                  ) : null}
                  <button
                    className='btn btn-primary  mt-4'
                    type='submit'
                    disabled={errors.email || errors.password ? true : false}
                  >
                    LOGIN
                  </button>
                  <hr></hr>
                  <p>
                    {" "}
                    you dont have an account ,,{" "}
                    <Link to={"/register"}>register</Link>{" "}
                  </p>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
