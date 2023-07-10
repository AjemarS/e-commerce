import React, { FC } from "react";
import { ProductProps } from "../models/product";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList: FC<ProductProps> = ({ product }) => {
  function clickHandler() {}

  return (
    <Link to={`/products/${product.id}`}>
      <div className="product__list">
        <div className="product__list--image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product__list--text">
          <div className="product__list--title">{product.title}</div>
          <div className="product__list--description">
            {product.description}
          </div>
          <div className="product__list--price">{product.price}$</div>
        </div>

        <div className="product__list--options">
          <button className="product__list--btn" onClick={clickHandler}>
            Buy
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
