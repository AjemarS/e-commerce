import React, { useState } from "react";
import "./Filters.css";
import RenderComponent from "./RenderComponent";
import Checkbox from "./Checkbox";
import { useAppDispatch } from "../hooks/redux";
import { setPrice, setPriceRange } from "../store/reducers/FiltersSlice";
import { useFetchAllCategoriesQuery } from "../services/ProductService";
import { updateCurrentProducts } from "../store/reducers/ProductSlice";

const Filters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories } = useFetchAllCategoriesQuery();

  const dispatch = useAppDispatch();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPrice(Number(e.target.value)));
    dispatch(updateCurrentProducts());
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const priceRange: [number, number] = JSON.parse(value);
    dispatch(setPriceRange(priceRange));
    dispatch(updateCurrentProducts());
  };

  return isOpen ? (
    <aside className="closed">
      <div className="filters__title">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img src="../assets/icons-filter.png" alt="" />
        </button>
      </div>
    </aside>
  ) : (
    <aside style={{ width: "250px" }}>
      <div className="filters__title">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img src="../assets/icons-filter.png" alt="" />
        </button>
        <span className="filters__title__label">Filters</span>
      </div>
      <div className="filters__menu">
        <div className="filters__menu__categories">
          <div className="filters__menu__categories__title">Categories</div>
          <div className="filters__menu__categories__checkboxes">
            {categories && (
              <RenderComponent
                items={categories}
                renderItem={(category: string) => (
                  <Checkbox
                    key={categories.indexOf(category)}
                    category={category}
                  />
                )}
              />
            )}
          </div>
          <div className="filters__menu__categories__price">
            <input type="number" id="" onChange={handlePriceChange} />
          </div>
          <div className="filters__menu__categories__price-range">
            <input type="range" id="" onChange={handlePriceRangeChange} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
