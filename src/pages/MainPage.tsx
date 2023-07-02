import { IProduct } from "../models/product";
import RenderComponent from "../components/RenderComponent";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import Filters from "../components/Filters";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectSearchResults } from "../store/reducers/SearchSlice";
import { fetchProducts } from "../store/reducers/ActionCreators";
import { useFetchAllProductsQuery } from "../services/ProductService";
import Pagination from "../components/Pagination";

const MainPage: React.FC = () => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [isList, setIsList] = useState(false);
  const [btnName, setBtnName] = useState("List");

  const dispatch = useAppDispatch();

  let Products: IProduct[] = [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useAppSelector((state) => state.product.products);

  const searchedProducts = useAppSelector(selectSearchResults);

  const filteredProducts = useAppSelector(
    (state) => state.filter.filteredProducts,
  );

  const paginationedProducts = useFetchAllProductsQuery([offset, limit]).data;

  function handleClickBtn() {
    isList ? setBtnName("List") : setBtnName("Cards");
    setIsList(!isList);
  }

  function handleChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setLimit(Number(value));
  }

  if (filteredProducts.length > 0) {
    Products = filteredProducts;
  } else if (searchedProducts.length > 0) {
    Products = searchedProducts;
  } else if (paginationedProducts && paginationedProducts?.length > 0) {
    Products = paginationedProducts;
  } else {
    Products = products;
  }

  console.log(
    "f:",
    filteredProducts,
    "s:",
    searchedProducts,
    "pg:",
    paginationedProducts,
    "p:",
    products,
  );
  return (
    <main>
      <Filters />
      <section className='cards'>
        <section className='cards-options'>
          <span className='cards-option__btn--text'>
            Show
            <select
              name=''
              id='cards-option__select'
              onChange={handleChangeSelect}
            >
              <option defaultValue={20}>20</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
              <option value={0}>All</option>
            </select>
            items on page
          </span>
          <span className='cards-option__btn--text'>Change to: </span>
          <button className='cards-options__btn' onClick={handleClickBtn}>
            {btnName}
          </button>
        </section>
        <Pagination
          limit={limit}
          products={Products}
          setOffset={setOffset}
        ></Pagination>
        {Products.length > 0 ? (
          <RenderComponent
            items={Products}
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
