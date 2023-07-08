import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { setCategory } from "../store/reducers/FiltersSlice";

interface CheckboxProps {
  category: string;
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
        id={category}
        onChange={handleCategoryChange}
      />
      <label htmlFor={category}>{category}</label>
    </div>
  );
};

export default Checkbox;
