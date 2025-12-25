import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
          item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItem(updatedCart);
    }else {
        setCartItem([...cartItem, {...product, quantity: 1}])
    }
  };

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(cartItem.map((item) => {
        if(item.id === productId) {
            let newUnit = item.quantity;
            if(action == "increase"){
                newUnit = newUnit + 1
            } else if(action == "decrease"){
                newUnit = newUnit - 1
            }
            return newUnit > 0 ? {...item, quantity: newUnit} : null
        }
        return item;
    }).filter(item => item != null) // remove item quantity 0
)
  }

  const deleteCart = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
  }
  return (
    <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
