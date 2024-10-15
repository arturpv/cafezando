import { createContext, ReactNode, useEffect, useState } from "react";
import { Coffee } from "../pages/Home/components/CoffeeCard";

export interface CartItem extends Coffee {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartQuantity: number;
  cartItemsTotal: number;
  addCoffeeToCart: (coffee: CartItem) => void;
  changeCartItemQuantity: (
    cartItemId: number,
    type: "increase" | "decrease"
  ) => void;
  removeCartItem: (cartItemId: number) => void;
  cleanCart: () => void;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

const COFFEE_ITEMS_STORAGE_KEY = "coffeeDelivery:cartItems";

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY);
    if (storedCartItems) {
      return JSON.parse(storedCartItems);
    }
    return [];
  });

  const cartQuantity = cartItems.length;

  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity;
  }, 0);

  function addCoffeeToCart(coffee: CartItem) {
    const coffeeAlreadyExistsInCart = cartItems.findIndex(
      (cartItem) => cartItem.id === coffee.id
    );

    const newItems =
      coffeeAlreadyExistsInCart >= 0
        ? cartItems.map((item, index) => {
            if (coffeeAlreadyExistsInCart === index) {
              return { ...item, quantity: coffee.quantity };
            } else {
              return item;
            }
          })
        : [...cartItems, coffee];

    setCartItems(newItems);
  }

  function changeCartItemQuantity(
    cartItemId: number,
    type: "increase" | "decrease"
  ) {
    const newCartItems = cartItems.map((item) => {
      if (item.id === cartItemId) {
        const newQuantity =
          type === "increase" ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 1, // Garante quantidade mínima de 1
        };
      }
      return item;
    });

    setCartItems(newCartItems);
  }

  function removeCartItem(cartItemId: number) {
    const newCartItems = cartItems.filter((item) => item.id !== cartItemId);
    setCartItems(newCartItems);
  }

  function cleanCart() {
    setCartItems([]);
  }

  useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCoffeeToCart,
        cartQuantity,
        changeCartItemQuantity,
        removeCartItem,
        cartItemsTotal,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
