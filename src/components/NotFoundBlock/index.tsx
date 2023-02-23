import React from 'react';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего на найдено
      </h1>
      <p className={styles.description}>К сожаление данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  );
}

export default NotFoundBlock;
