import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles';
import {Link, useLocation} from 'react-router-dom';

function Navbar({items}) {
    const location = useLocation();
    const classes = useStyles();
  return (
    <AppBar position="fixed" color="inherit" className={classes.root}>
        <Toolbar>
            <Typography variant="h6" classeName={classes.title} color="inherit" component={Link} to="/">
                React Shop
            </Typography>
            <div className={classes.grow}/>
            <div className={classes.button}>
                { location.pathname === '/' && <IconButton aria-label="show cart label" color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={items} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>}
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;