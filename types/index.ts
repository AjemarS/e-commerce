export interface ProductBase {
  name: string;
  price: number;
  stock: number;
  category: CategoryBase;
  image?: string;
  description?: string;
}

export interface CategoryBase {
  name: string;
}

export interface IProduct extends ProductBase {
  _id: string;
  slug: string;
}

export interface ICategory extends CategoryBase {
  _id: string;
  slug: string;
}
