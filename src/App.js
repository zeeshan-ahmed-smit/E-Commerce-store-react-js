import './App.css';
import React from 'react';
import AppRouter from './components/Router';
import CartContext from './context/cart';


function App() {
  const [cart, setCart] = React.useState([])
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData)
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <AppRouter />
    </CartContext.Provider>
  );
}

export default App;
