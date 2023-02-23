import { FetchPizzasArgs, PizzaItem } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
    'pizza/fetchPizzas',
    async (params) => {
      const { category, sort, search, currentPage } = params;
      const { data } = await axios.get<PizzaItem[]>(
        `https://6389d0abc5356b25a2098b76.mockapi.io/cart?page=${currentPage}&limit=4&sortBy=${sort.sort}&order=${sort.order}&${category}${search}`,
      );
  
      return data;
    },
  );