import React from 'react'
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

function Products({products, addToCart}) {
    const classes = useStyles();
  return (
      <div className={classes.content}>
          <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product)=>
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} addToCart={addToCart}/>
                    </Grid>
                )}
            </Grid>
      </div>
  )
}

export default Products;