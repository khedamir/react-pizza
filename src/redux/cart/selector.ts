import { RootState } from './../store';

export const cartSelector = (state: RootState) => state.cart;

export const cartItemCountByIdSelector = (state: RootState, id: string) => {
  return state.cart.items
    .filter((obj) => obj.id === id)
    .reduce((sum, item) => {
      return item.count + sum;
    }, 0);
};

export const cartFullItemsCount = (state: RootState) => {
  return state.cart.items.reduce((sum, item) => item.count + sum, 0);
}