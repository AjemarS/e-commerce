export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string
  images: string[];
}

export interface ProductProps {
  product: IProduct;
}
