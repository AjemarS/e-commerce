export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: IProductCategory;
  images: string[];
}
export interface IProductCategory {
  id: number;
  name: string;
}
export interface ProductProps {
  product: IProduct;
}
