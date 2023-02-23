import { CartItemType } from '../redux/cart/types';

export const getCartFronLS = () => {
  const data = localStorage.getItem('cartItems');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = items.reduce((sum: number, item: CartItemType) => {
    return item.price * item.count + sum;
  }, 0);
  return { items: items as CartItemType[], totalPrice };
};
