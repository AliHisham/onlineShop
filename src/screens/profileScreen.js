import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetDetailsAction, UpdateAction } from "../actions/loginAction";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Container, Row, Col } from "react-bootstrap";

const UpdateSchema = Yup.object().shape({
  name: Yup.string().required("enter your name"),
  email: Yup.string().required("enter your email"),
  password: Yup.string().required("enter your password"),
});

const ProfileScreen = ({ match }) => {
  var id = match.params.id;
  console.log("match@,@,", match);
  const dispatch = useDispatch();
  const Getdetails = useSelector((state) => {
    return state.details;
  });
  const UpdateProfile = useSelector((state) => {
    return state.update;
  });
  const { success } = UpdateProfile;
  const { user } = Getdetails;

  useEffect(() => {
    dispatch(GetDetailsAction(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Container>
      {console.log(user)}
      <Row className='justify-content-md-center mt-5'>
        <Col md={6} xs={12}>
          <h1>PROFILE</h1>
          <hr></hr>
          <Formik
            enableReinitialize
            validationSchema={UpdateSchema}
            initialValues={user || { name: "", password: "", email: "" }}
            onSubmit={(values, { resetForm, ...otherProps }) => {
              dispatch(UpdateAction(match.params.id, values));
            }}
          >
            {({ errors, touched, dirty, isValid, isValidating }) => {
              return (
                <Form>
                  {success && <p className='text-warning'>profile updated</p>}
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
                    disabled={
                      errors.name || errors.email || errors.password
                        ? true
                        : false
                    }
                  >
                    UPDATE
                  </button>
                  <hr></hr>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
