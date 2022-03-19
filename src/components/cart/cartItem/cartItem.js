import React from 'react'
import {Typography, Card, CardMedia, CardContent, CardActions, Button} from '@material-ui/core';
import useStyles from './styles';

function CartItem({item, handleUpdateCart, handleRemoveFromCart}) {
    const classes = useStyles();
  return (
    <Card>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant="h4">
                {item.name}
            </Typography>
            <Typography variant="h5">
                {item.line_total.formatted_with_symbol}
            </Typography>
        </CardContent>
        <CardActions className={classes.cartActions}>
            <div className={classes.buttons}>
                <Button size="small" 
                        type="button"
                        onClick={()=>handleUpdateCart(item.id, item.quantity-1)}
                >
                    -
                </Button>
                <Typography>{item.quantity}</Typography>
                <Button size="small"
                        type="button"
                        onClick={()=>handleUpdateCart(item.id, item.quantity+1)}
                >
                    +
                </Button>
            </div>
            <Button type="button"
                    variant="contained"
                    color="secondary"
                    onClick={()=>handleRemoveFromCart(item.id)}
            >
                Remove
            </Button>
        </CardActions>
    </Card>
  )
}

export default CartItem;