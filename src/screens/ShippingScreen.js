import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { ShippingAddress } from "../actions/cartActions";
import CheckSteps from "../components/ChekoutSteps";

const ShippingSchema = Yup.object().shape({
  address: Yup.string().required("enetr your address"),
  city: Yup.string().required("enetr your city"),
  postalCode: Yup.string().required("enter postal code"),
  country: Yup.string().required("enter your country"),
});

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const Address = useSelector((state) => {
    return state.cart;
  });
  const { shippingAddress } = Address;
  const [data, setData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  useEffect(() => {
    if (shippingAddress) {
      setData(shippingAddress);
    }
  }, [shippingAddress]);
  return (
    <Container>
      <CheckSteps step1 step2></CheckSteps>
      <Row className='justify-content-md-center mt-5'>
        <Col md={6} xs={12}>
          <h1>SHIPPING DETAILS</h1>
          <hr></hr>
          <Formik
            validationSchema={ShippingSchema}
            initialValues={data}
            enableReinitialize={true}
            onSubmit={(values, { resetForm, ...otherProps }) => {
              console.log(values);
              dispatch(ShippingAddress(values));
              history.push("/payment");
            }}
          >
            {({ errors, touched, dirty, isValid, isValidating }) => {
              return (
                <Form>
                  <label>Address</label>
                  <Field name='address' className='form-control'></Field>
                  {errors.address && touched.address ? (
                    <p className='text-danger'>{errors.address}</p>
                  ) : null}
                  <label>City</label>
                  <Field name='city' className='form-control'></Field>
                  {errors.city && touched.city ? (
                    <p className='text-danger'>{errors.city}</p>
                  ) : null}
                  <label>Postal code</label>
                  <Field name='postalCode' className='form-control'></Field>
                  {errors.postalCode && touched.postalCode ? (
                    <p className='text-danger'>{errors.postalCode}</p>
                  ) : null}
                  <label>Country</label>
                  <Field name='country' className='form-control'></Field>
                  {errors.country && touched.country ? (
                    <p className='text-danger'>{errors.country}</p>
                  ) : null}
                  <button
                    className='btn btn-primary  mt-4'
                    type='submit'
                    disabled={
                      errors.address ||
                      errors.city ||
                      errors.postalCode ||
                      errors.country
                        ? true
                        : false
                    }
                  >
                    CONTINUE
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

export default ShippingScreen;
