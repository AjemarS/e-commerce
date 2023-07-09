import { useParams } from "react-router";
import { useAppSelector } from "../hooks/redux";

const ProductPage = () => {
  const {id} = useParams()

  const products = useAppSelector((state) => state.product.allProducts)

  const product = products.find(obj => obj['id'].toString() === id)
  return <div>{product?.title}</div>;
};

export default ProductPage;
