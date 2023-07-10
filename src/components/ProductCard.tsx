import { FC, useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { ProductProps } from "../models/product";
import { Cookies } from "react-cookie";

const ProductCard: FC<ProductProps> = ({ product }) => {
  const [idToCookie, setIdToCookie] = useState<number[]>([]);
  const cookie = new Cookies();

  function clickHandler() {}
  function clickProductHandler() {
    setIdToCookie([...idToCookie, product.id]);
    cookie.set("recent", JSON.stringify(idToCookie));
  }

  return (
    <Link to={`/products/${product.id}`} onClick={clickProductHandler}>
      <div className="product__card">
        <div className="product__card--title">{product.title}</div>
        <div className="product__card--image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="product__card--bottom">
          <div className="product__card--price">{product.price}$</div>
          <div className="product__card--btns">
            <button className="product__card__btn--like" onClick={clickHandler}>
              <img src="../assets/icons-love.png" alt="" />
            </button>
            <button className="product__card__btn--buy" onClick={clickHandler}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
