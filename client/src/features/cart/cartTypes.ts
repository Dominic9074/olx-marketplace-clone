export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  imageUrl: string;
  isSold: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface cartItem {
  product: Product;
}

export interface cartState {
  items: cartItem[];
}
