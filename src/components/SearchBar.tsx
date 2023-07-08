import React from "react";
import "./SearchBar.css";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setSearchQuery,
  searchProducts,
  selectSearchQuery,
} from "../store/reducers/SearchSlice";
import { updateCurrentProducts } from "../store/reducers/ProductSlice";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  function changeSearchTerm(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(e.target.value));
    return (e.target.value = "");
  }
  const handleSearch = () => {
    dispatch(searchProducts());
    dispatch(updateCurrentProducts());
  };

  return (
    <div className='searchBar'>
      <input
        onChange={changeSearchTerm}
        value={searchQuery}
        type='text'
        placeholder='Search'
      />
      <button onClick={handleSearch}>
        <img src='../assets/icons-search.png' alt='' />
      </button>
    </div>
  );
};

export default SearchBar;
