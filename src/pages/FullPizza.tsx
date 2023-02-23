import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { typeNames } from '../components/PizzaBlock';
import { PizzaItem } from '../redux/pizza/types';

const FullPizza: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<PizzaItem>();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get(
          `https://6389d0abc5356b25a2098b76.mockapi.io/cart/${params.id}`, 
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        console.log(error);
        navigate('/');
      }
    };

    fetchPizzas();
  }, [navigate, params.id]);

  if (!pizza) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="fullpizza">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <div className="fullpizza__description">
          <h1>{pizza.title}</h1>
          <p>
            <b>Цена:</b> от {pizza.price} ₽
          </p>
          <p>
            <b>Доступные размеры:</b>{' '}
            {pizza.sizes.map((size, id) => (
              <span key={id}>{size} см., </span>
            ))}
          </p>
          <p>
            <b>Тесто:</b>{' '}
            {typeNames.map((type, id) => (
              <span key={id}>{type}, </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FullPizza;
