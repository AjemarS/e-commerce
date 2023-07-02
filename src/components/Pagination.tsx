import React from "react";
import { IProduct } from "../models/product";

interface PaginationProps {
  limit: number;
  setOffset: Function;
  products: IProduct[];
}

const Pagination = ({ limit, products }: PaginationProps) => {
  const productsLength = products.length;
  let items = (limit - (limit % productsLength)) / productsLength + 1;
  let arr: any[] = [];
  arr.length = items;
  return (
    <section className='pagination'>
      {arr.map((item, index) => (
        <a href=''>{index}</a>
      ))}
    </section>
  );
};

export default Pagination;
