import logo from './logo.svg';
import './App.css';
import Products from './components/products/products';
import Navbar from './components/Navbar/Navbar';
import {commerce} from './lib/commerce';
import {useState, useEffect} from 'react';
import Cart from './components/cart/Cart';
import {BrowserRouter, Router, Switch} from 'react-router-dom';
import { Route } from 'react-router-dom';
import Checkout from './components/checkoutForm/checkout/checkout';


function App() {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState({});

  const [order, setOrder] = useState({});

  const [error, setError] = useState('');

  const handleToAdd = async(ItemId, quantity)=>{
    const response = await commerce.cart.add(ItemId, quantity);
    setCart(response.cart);
  };
  const fetchCart = async ()=>{
    const data = await commerce.cart.retrieve();
    setCart(data);
  };

  const fetchProduct = async()=>{
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const handleUpdateCart = async(itemId, quantity)=>{
    const {cart} = await commerce.cart.update(itemId, {quantity});
    console.log("cart update: ", cart);
    setCart(cart);
  };

  const handleRemoveFromCart = async(itemId)=>{
    const {cart} = await commerce.cart.remove(itemId);
    console.log("remove from cart:", cart);
    setCart(cart);
  };

  const handleEmptyCart = async()=>{
    const {cart} = await commerce.cart.empty();
    console.log("empty cart:", cart);
    setCart(cart);
  };

  const refreshCart = async()=>{
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async(tokenId, newOrder)=>{
    try{
      console.log(newOrder);
      const incomingOrder = await commerce.checkout.capture(tokenId, newOrder);
      console.log("captured order:", incomingOrder);
      setOrder(incomingOrder);
      refreshCart();
    }catch(err){
      console.log(err);
      setError(err.data.error.message);
    }
  };

  useEffect(()=>{
    fetchProduct();
    fetchCart();
  }, []);
    return (
      <BrowserRouter>
        <div>
          <Navbar items={cart.total_items}/>
          <Switch>
            <Route exact path="/" render={()=><Products products={products} addToCart={handleToAdd}/>} />
            <Route exact path="/cart" render={()=><Cart cart={cart}
                                                        handleEmptyCart={handleEmptyCart}
                                                        handleRemoveFromCart={handleRemoveFromCart}
                                                        handleUpdateCart={handleUpdateCart}
            />} />
            <Route exact path="/checkout" render={()=><Checkout cart={cart}
                                                                order={order}
                                                                error={error}
                                                                handleCaptureCheckout={handleCaptureCheckout}
            />}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
}

export default App;
