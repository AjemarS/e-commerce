import React from "react";
import { ProductProps } from "../models/product";

const ProductPageProductCard = ({ product }: ProductProps) => {
  return (
    <div className="product">
      <div className="product__images"></div>
      <div className="product__text"></div>
      <div className="product__options"></div>
    </div>
  );
};

export default ProductPageProductCard;
