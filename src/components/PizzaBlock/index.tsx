import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartItemCountByIdSelector } from '../../redux/cart/selector';
import { addItem } from '../../redux/cart/slice';
import { CartItemType } from '../../redux/cart/types';
import { PizzaItem } from '../../redux/pizza/types';
import { RootState } from '../../redux/store';

export const typeNames = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  pizza: PizzaItem
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({ pizza }) => {
  const [pizzaCount, setPizzaCount] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedItems = useSelector((state: RootState) => cartItemCountByIdSelector(state, pizza.id));
  const dispatch = useDispatch();

  const onClickAdd = () => {
    setPizzaCount(pizzaCount + 1);
    const item: CartItemType = {
      ...pizza,
      type: typeNames[activeType],
      size: activeSize,
      count: 1
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${pizza.id}`}>
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {pizza.types.map((type, i) => (
            <li
              key={i}
              onClick={() => setActiveType(i)}
              className={activeType === i ? 'active' : ''}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {pizza.sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedItems > 0 && <i>{addedItems}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
