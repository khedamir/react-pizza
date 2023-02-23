import { SortType } from "../filter/types";

export type FetchPizzasArgs = {
  category: string;
  sort: SortType;
  search: string;
  currentPage: number;
};

export type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
  rating: number;
  sizes: [number];
  types: [number];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
