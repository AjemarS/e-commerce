import { useParams } from "react-router";
import { useAppSelector } from "../hooks/redux";
import ProductPageProductCard from "../components/ProductPageProductCard";

const ProductPage = () => {
  const { id } = useParams();

  const products = useAppSelector((state) => state.product.allProducts);

  const product = products.find((obj) => obj["id"].toString() === id);

  return (
    <article className="product-page">
      {product && <ProductPageProductCard product={product} />}
    </article>
  );
};

export default ProductPage;
