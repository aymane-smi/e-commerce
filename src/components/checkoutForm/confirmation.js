import React from 'react'
import {Typography, Divider, Button, CircularProgress} from '@material-ui/core';
import useStyles from './checkout/styles';
import {Link} from 'react-router-dom';
function Confirmation({order, error}) {
  const classes = useStyles();
  if(error)
    return <Typography variant="subtitle2">
      {error}
    </Typography>;
  else 
    return 
    (order.costumer ? (<>
    <div>
      <Typography variant="h5"> thank you for your purchase, {order.costumer.firstname} {order.costumer.lastname}</Typography>
      <Divider classeName={classes.divider}/>
      <Typography variant="subtitle2">Order ref: {order.costumer_refernce}</Typography>
    </div>
    <Button component={Link} to="/" variant="outlined" type="button"></Button>
  </> ) : (<div className={classes.spinner}>
    <CircularProgress />
  </div>));
  
}

export default Confirmation;