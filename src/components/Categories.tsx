import React from 'react';

type CategoryProps = {
  categoryId: number;
  onClickCategory: (index: number) => void
}
const categories = ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoryProps> = React.memo(({ categoryId, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;
