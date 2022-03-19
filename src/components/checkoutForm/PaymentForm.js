import React from 'react'
import {Typography, Button, Divider} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from './Review';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);
function PaymentForm({token, shippingData, prevStep, handleCaptureCheckout, nextStep}) {
  const handleSubmit = async(evt, elements, stripe)=>{
    evt.preventDefault();
    if(!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card: cardElement});
    console.log(paymentMethod);
    if(error)
      console.log(error);
    else{
      const orderData = {
        line_items: token.live.line_items,
        customer : {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email
        },
        shipping:{
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          country: shippingData.shippingCountry,
          county_state : shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip
        },
        // billing:{
        //   name: shippingData.firstname,
        //   street: shippingData.address,
        //   town_city: shippingData.city,
        //   country: shippingData.shippingCountry,
        //   county_state : shippingData.shippingSubdivision,
        //   postal_zip_code: shippingData.zip
        // },
        fulfillment : {
          shipping_method: shippingData.shippingOption
        },
        payment:{
          gateway: 'gway_Ll2aRZDRje4G5V',
          stripe:{
            payment_method_id: paymentMethod.id
          }
        }
      }

      handleCaptureCheckout(token.id, orderData);
      nextStep();
    }
  };
  return (
    <>
      <Review token={token}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe})=>(
            <form onSubmit={(evt)=>handleSubmit(evt, elements, stripe)}>
              <CardElement />
              <br /><br />
              <div style={{display: 'flex', justifyContent:'space-between'}}>
                <Button variant="outlined" onClick={prevStep}>Back</Button>
                <Button variant="contained" type="submit" disabled={!stripe} color="primary">
                  Pay {token.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm;