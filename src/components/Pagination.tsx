import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
  onPageChange: (pageNumber: number) => void;
  onProductsPerPageChange: (value: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  productsPerPage,
  totalProducts,
  onPageChange,
  onProductsPerPageChange,
}) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1;
    onPageChange(selectedPage);
  };

  const handleProductsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    onProductsPerPageChange(value);
  };

  return (
    <div>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      <select value={productsPerPage} onChange={handleProductsPerPageChange}>
        <option value={20}>20 на сторінку</option>
        <option value={100}>100 на сторінку</option>
        <option value={0}>Всі на сторінку</option>
      </select>
    </div>
  );
};
export default Pagination;
