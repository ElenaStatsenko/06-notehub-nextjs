import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
interface PaginationProps {
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
}
export default function Pagination({
  pageCount,
  page,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
