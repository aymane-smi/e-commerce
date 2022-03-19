import React , {useState, useEffect} from 'react'
import {Paper, Step, Stepper, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../adressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import {Link} from 'react-router-dom';

const steps = ['Shipping address', 'Payment details'];

function Checkout({cart, handleCaptureCheckout, order, error}) {
    const classes = useStyles();
    const [step, setStep] = useState(0);
    const [token, setToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const generateToken = async()=>{
        try{
                const token_ = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setToken(token_);
        }catch(err){
            console.log(err.message);
        }
    };

    const nextStep = ()=>{
        setStep((prevStep)=>step+1);
    };

    const prevStep = ()=>{
        setStep((prevStep)=>step-1);
    };

    const next = (data)=>{
        console.log(data);
        setShippingData(data);
        nextStep();
    };
    let Confirmation = ()=>(
            (order.costumer ? (<>
            <div>
            <Typography variant="h5"> thank you for your purchase, {order.costumer.firstname} {order.costumer.lastname}</Typography>
            <Divider classeName={classes.divider}/>
            <Typography variant="subtitle2">Order ref: {order.costumer_refernce}</Typography>
            </div>
            <Button component={Link} to="/" variant="outlined" type="button"></Button>
        </> ) : (<div className={classes.spinner}>
            <CircularProgress />
        </div>))
    );
    if(error)
        Confirmation = ()=>(
             <>
                <Typography variant="subtitle1">{error}</Typography>
                <Button component={Link} to="/cart" variant="outlined">Go Back</Button>
             </>
        );
    useEffect(()=>{
        generateToken();
    }, []);
    const Form = ()=> step === 0 ? <AddressForm token={token} next={next}/> : <PaymentForm nextStep={nextStep} prevStep={prevStep} shippingData={shippingData} token={token} handleCaptureCheckout={handleCaptureCheckout}/>;
  return (
    <>
        <div className={classes.toolbar}/>
        <div className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">
                    Checkout
                </Typography>
                <Stepper activeStep={step} className={classes.stepper}>
                    {steps.map(step=>(
                        <Step key={step}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {step === steps.length ? <Confirmation order={order} error={error}/> : (token && <Form />)}
            </Paper>
        </div>
    </>
  )
}

export default Checkout;