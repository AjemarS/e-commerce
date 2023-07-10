import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import RenderComponent from "../components/RenderComponent";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setAllProducts,
  setCurrentPage,
  setProductsPerPage,
  updateCurrentProducts,
} from "../store/reducers/ProductSlice";
import { useFetchAllProductsQuery } from "../services/ProductService";
import "./Shop.css";

const Shop: React.FC = () => {
  const [isList, setIsList] = useState(false);

  const dispatch = useAppDispatch();

  const { data: products } = useFetchAllProductsQuery([100, 0]);

  useEffect(() => {
    products && dispatch(setAllProducts(products));
    dispatch(updateCurrentProducts());
  }, [products, dispatch]);

  function handleClickBtn() {
    setIsList(!isList);
  }

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleProductsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setProductsPerPage(value));
  };

  const { currentProducts, currentPage, productsPerPage } = useAppSelector(
    (state) => state.product
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentPageProducts = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return currentPageProducts.length > 0 ? (
    <article className="shop">
      <section className="shop__options">
        <div className="shop__options--change-quantity">
          <select
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
          >
            <option value={20}>20 items</option>
            <option value={50}>50 items</option>
            <option value={100}>All items</option>
          </select>
        </div>
        <div className="shop__options--change-mode">
          <button
            className={
              isList ? "shop__options__btns" : "shop__options__btns active"
            }
            onClick={handleClickBtn}
          >
            <img src="../assets/icons-small-icons.png" alt=" " />
          </button>
          <button
            className={
              isList ? "shop__options__btns active" : "shop__options__btns"
            }
            onClick={handleClickBtn}
          >
            <img src="../assets/icons-list.png" alt=" " />
          </button>
        </div>
      </section>
      <section className={isList ? "list" : "cards"}>
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
      </section>

      {productsPerPage === currentProducts.length ? (
        <div style={{ height: 70 }}></div>
      ) : (
        <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={currentProducts.length}
          onPageChange={handlePageChange}
        />
      )}
    </article>
  ) : (
    <span className="error">Something went wrong</span>
  );
};

export default Shop;
