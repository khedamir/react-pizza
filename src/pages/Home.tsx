import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import Pagination from '../components/Pagination';

import QueryString from 'qs';
// import data from '../assets/pizza.json';

import { useAppDispatch } from '../redux/store';
import { pizzaDataSelector } from '../redux/pizza/selector';
import { fetchPizzas } from '../redux/pizza/asyncAction';
import { filterSelector } from '../redux/filter/selector';
import { setCategoryId, setFilters } from '../redux/filter/slice';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useAppDispatch();

  const { searchValue } = useSelector(filterSelector);

  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, [dispatch]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sort: sort.sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL_параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          currentPage: Number(params.currentPage),
          categoryId: Number(params.categoryId),
          sort: list.find((item) => item.sort === params.sort) || list[0],
          searchValue: ''
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер то запрашиваем пиццы
  useEffect(() => {
    const getPizzas = async () => {
      if (!isSearch.current) {
        const category = categoryId ? `&category=${categoryId}` : '';
        const search = searchValue && `&search=${searchValue}`;
        dispatch(
          fetchPizzas({
            category,
            sort,
            search,
            currentPage,
          }),
        );
      }
    };
    getPizzas();
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h1>
            Произошла ошибка <span>😕</span>
          </h1>
          <p>
            К сожалению, не удалось получить пиццы. <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : status === 'loading' ? (
        [...new Array(4)].map((_, i) => <Skeleton key={i} />)
      ) : (
        <div className="content__items">
          {items
            // .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((pizza: any) => (
              <PizzaBlock key={pizza.id} pizza={pizza} />
            ))}
        </div>
      )}
      <Pagination />
    </div>
  );
}

export default Home;
