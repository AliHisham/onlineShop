import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import * as Yup from "yup";
import Loader from "../components/Spinner";
import { addProductAction, updateProductAction } from "../actions/CUD_PRODUCT";
import productDetails from "../actions/productDetailsAction";

const addProductSchema = Yup.object().shape({
  name: Yup.string().required("enter name"),
  image: Yup.string().required("enter image"),
  brand: Yup.string().required("enter brand "),
  category: Yup.string().required("enter category"),
  description: Yup.string().required("enter description"),
  price: Yup.number().required("enter price"),
  countInStock: Yup.number(),
});

const AddProductScreen = ({ history, match }) => {
  const { userInfo } = useSelector((state) => {
    return state.login;
  });
  const { loading, product } = useSelector((state) => {
    return state.productDetails;
  });
  const { success } = useSelector((state) => {
    return state.updateProduct;
  });
  const { addsuccess } = useSelector((state) => {
    return state.addProduct;
  });
  const dispatch = useDispatch();
  const initial = {
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    countInStock: 0,
  };
  useEffect(() => {
    if (!userInfo.type) {
      history.push("/");
    } else {
      if (match.params.id) {
        dispatch(productDetails(match.params.id));
      }
    }
  }, [dispatch, match.params.id, success, addsuccess]);

  return (
    <>
      <Container>
        <Row>
          <Button
            onClick={() => {
              history.push("/allproducts");
              dispatch({ type: "ADD_PRODUCT_RESET" });
              dispatch({ type: "UPDATE_PRODUCT_RESET" });
            }}
          >
            Go Back
          </Button>
        </Row>
        <Row className='justify-content-md-center mt-5'>
          {success && <Alert variant='success'>product updated</Alert>}
          {addsuccess && <Alert variant='success'>product created</Alert>}
          <Col md={12} xs={12}>
            <Formik
              validationSchema={addProductSchema}
              initialValues={product ? product : initial}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                if (match.params.id) {
                  dispatch(updateProductAction(match.params.id, values));
                } else {
                  dispatch(
                    addProductAction({
                      user: userInfo.id,
                      name: values.name,
                      image: values.image,
                      brand: values.brand,
                      category: values.category,
                      description: values.description,
                      price: values.price,
                      countInStock: values.countInStock,
                    })
                  );
                }
              }}
            >
              {({ errors, touched, dirty, isValid, isValidating }) => {
                return loading ? (
                  <Loader></Loader>
                ) : (
                  <Form>
                    <label>Name</label>
                    <Field name='name' className='form-control'></Field>
                    {errors.name && touched.name ? (
                      <p className='text-danger'>{errors.name}</p>
                    ) : null}
                    <label>Image</label>
                    <Field name='image' className='form-control'></Field>
                    {errors.image && touched.image ? (
                      <p className='text-danger' type='name'>
                        {errors.image}
                      </p>
                    ) : null}
                    <label>Brand</label>
                    <Field name='brand' className='form-control'></Field>
                    {errors.brand && touched.brand ? (
                      <p className='text-danger' type='name'>
                        {errors.brand}
                      </p>
                    ) : null}
                    <label>Category</label>
                    <Field name='category' className='form-control'></Field>
                    {errors.category && touched.category ? (
                      <p className='text-danger' type='name'>
                        {errors.category}
                      </p>
                    ) : null}
                    <label>Description</label>
                    <Field name='description' className='form-control'></Field>
                    {errors.description && touched.description ? (
                      <p className='text-danger' type='name'>
                        {errors.description}
                      </p>
                    ) : null}
                    <label>Price</label>
                    <Field name='price' className='form-control'></Field>
                    {errors.price && touched.price ? (
                      <p className='text-danger' type='number'>
                        {errors.price}
                      </p>
                    ) : null}
                    <label>Count In Stock</label>
                    <Field name='countInStock' className='form-control'></Field>
                    {errors.countInStock && touched.countInStock ? (
                      <p className='text-danger' type='number'>
                        {errors.countInStock}
                      </p>
                    ) : null}

                    <button
                      className='btn btn-primary btn-block  mt-4'
                      type='submit'
                      disabled={
                        errors.name ||
                        errors.image ||
                        errors.brand ||
                        errors.category ||
                        errors.description
                          ? true
                          : false
                      }
                    >
                      SUBMIT
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProductScreen;
