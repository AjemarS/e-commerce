import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { IProductCategory } from "../models/product";
import { setCategory } from "../store/reducers/FiltersSlice";

interface CheckboxProps {
  category: IProductCategory;
}

const Checkbox: React.FC<CheckboxProps> = ({ category }) => {
  const dispatch = useAppDispatch();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory(e.target.value));
  };
  return (
    <div>
      <input
        type='checkbox'
        id={category.name}
        onChange={handleCategoryChange}
      />
      <label htmlFor={category.name}>{category.name}</label>
    </div>
  );
};

export default Checkbox;
