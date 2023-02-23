import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelector } from '../../redux/filter/selector';
import { setCurrentPage } from '../../redux/filter/slice';
import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(filterSelector);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}

export default Pagination;
