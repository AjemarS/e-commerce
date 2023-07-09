import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  productsPerPage,
  totalProducts,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <section className="pagination">
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={"paginationComponent"}
        activeClassName={"activePage"}
        previousLabel="<"
        nextLabel=">"
      />
    </section>
  );
};
export default Pagination;
