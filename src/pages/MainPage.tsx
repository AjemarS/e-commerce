import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import RenderComponent from "../components/RenderComponent";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setAllProducts,
  setCurrentPage,
  setProductsPerPage,
  updateCurrentProducts,
} from "../store/reducers/ProductSlice";
import { useFetchAllProductsQuery } from "../services/ProductService";

const MainPage: React.FC = () => {
  const [isList, setIsList] = useState(false);
  const [btnName, setBtnName] = useState("List");

  const dispatch = useAppDispatch();

  const { data: products } = useFetchAllProductsQuery([100, 0]);

  useEffect(() => {
    products && dispatch(setAllProducts(products));
    dispatch(updateCurrentProducts());
  }, [products, dispatch]);

  function handleClickBtn() {
    isList ? setBtnName("List") : setBtnName("Cards");
    setIsList(!isList);
  }

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleProductsPerPageChange = (value: number) => {
    dispatch(setProductsPerPage(value));
  };

  const { currentProducts, currentPage, productsPerPage } = useAppSelector(
    (state) => state.product,
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentPageProducts = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <main>
      <Filters />
      <section className='cards'>
        <section className='cards-options'>
          <span className='cards-option__btn--text'>Change to: </span>
          <button className='cards-options__btn' onClick={handleClickBtn}>
            {btnName}
          </button>
        </section>
        <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={currentProducts.length}
          onPageChange={handlePageChange}
          onProductsPerPageChange={handleProductsPerPageChange}
        />
        {currentPageProducts.length > 0 ? (
          <RenderComponent
            items={currentPageProducts}
            renderItem={(product: IProduct) =>
              isList ? (
                <ProductList key={product.id} product={product} />
              ) : (
                <ProductCard key={product.id} product={product} />
              )
            }
          />
        ) : (
          <span className='error'>Something went wrong</span>
        )}
      </section>
    </main>
  );
};

export default MainPage;
