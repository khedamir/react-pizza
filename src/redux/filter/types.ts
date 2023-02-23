export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export enum SortOrderEnum {
  DESC = 'desc',
  ASC = 'asc',
}

export type SortType = {
  name: string;
  sort: SortPropertyEnum;
  order: SortOrderEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}
