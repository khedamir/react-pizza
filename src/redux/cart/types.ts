export type CartItemType = {
  id: string;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
  rating: number;
  sizes: [number];
  types: [number];
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
