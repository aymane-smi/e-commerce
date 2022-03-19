import React from 'react'
import useStyles from './styles';
import {Container, Typography, Grid, Button} from '@material-ui/core';
import CardItem from './cartItem/cartItem';
import {Link} from 'react-router-dom';


function Cart({cart, handleEmptyCart, handleRemoveFromCart, handleUpdateCart}) {
    const classes = useStyles();

    const isEmpty = !cart.line_items;

    const EmptyCart = ()=>{
        return <Typography variant="subtitle1">
            You have no items in you shopping cart
            <Link className={classes.link} to="/">Start adding some!!</Link>
        </Typography>;
    };

    const FilledCart = ()=>{
        return <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CardItem item={item}
                                  handleRemoveFromCart={handleRemoveFromCart}
                                  handleUpdateCart={handleUpdateCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    subTotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <Button type="button" className={classes.emptyButton} size="large" variant="contained" color="secondary" onClick={handleEmptyCart}>
                    Empty Cart
                </Button>
                <Button type="button" className={classes.checkoutButton} size="large" variant="contained" color="primary" component={Link} to="/checkout">
                    Checkout
                </Button>
            </div>
        </>
    }; 
    if(isEmpty) return <div className={classes.link}>Loading</div>;
  return (
    <Container>
        <div className={classes.toolbar}/>
        <div className={classes.toolbar}>
            <Typography variant="h3" className={classes.title} gutterBottom>
                Your Shopping Cart
            </Typography>
            {cart.line_items.length === 0 ? <EmptyCart /> : <FilledCart />}
        </div>
    </Container>
  )
}

export default Cart