import React, { FC } from "react";
import { ProductProps } from "../models/product";
import { Link } from "react-router-dom";

const ProductList: FC<ProductProps> = ({ product }) => {
  function clickHandler() {}

  return (    
    <Link to={`/products/${product.id}`}>
      <div className='product__list'>
        <div className='product__list--top'>
          <div className='product__list--title'>{product.title}</div>
          <div className='product__list--image'>
            <img src={product.images[0]} alt={product.title} />
          </div>
        </div>
        <div className='product__list--text'>
          <div className='product__list--description'>
            {product.description}
          </div>
          <div className='product__list--price'>{product.price}$</div>
          <button className='product__list--btn' onClick={clickHandler}>
            Buy
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
