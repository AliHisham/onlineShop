import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import CheckSteps from "../components/ChekoutSteps";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { ChoosePaymentMethod } from "../actions/cartActions";

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const Method = useSelector((state) => {
    return state.cart;
  });
  const { shippingAddress } = Method;
  const [value, setValue] = useState("");
  const handleRadioChange = (e) => {
    console.log(e.target.value, "ali form paymenttsttsts");
    setValue(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(ChoosePaymentMethod(value));
    history.push("/placeorder");
  };

  if (!shippingAddress) {
    history.push("/shipping");
  }

  return (
    <Container>
      <CheckSteps step1 step2 step3></CheckSteps>
      <Row className='justify-content-md-center mt-5'>
        <Col md={6} xs={12}>
          <form onSubmit={submit}>
            <FormControl component='fieldset'>
              <FormLabel component='legend'>Payment Method</FormLabel>
              <RadioGroup
                aria-label='quiz'
                name='quiz'
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value='paypal'
                  control={<Radio />}
                  label='Credit Card or PayPal'
                />
              </RadioGroup>
            </FormControl>
            <hr></hr>
            <Button variant='primary' type='submit'>
              CONTINUE
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
