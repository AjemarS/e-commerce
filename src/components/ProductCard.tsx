import { FC } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { ProductProps } from "../models/product";

const ProductCard: FC<ProductProps> = ({ product }) => {
  function clickHandler() {}

  return (
    <Link to={"/products/:id"}>
      <div className='product__card'>
        <div className='product__card--title'>{product.title}</div>
        <div className='product__card--image'>
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className='product__card--bottom'>
          <div className='product__card--price'>{product.price}$</div>
          <button className='product__card--btn' onClick={clickHandler}>
            Buy
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
