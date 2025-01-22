export type DropdownOptionType = {
  value: string;
  label: string;
};

export type CategoryType = {
  slug: string;
  name: string;
  url: string;
};

export type SortOptionsType = {
  value: SortOptionsValueType;
  label: string;
};

export type SortOptionsValueType =
  | "rating-desc"
  | "rating-asc"
  | "price-desc"
  | "price-asc";

export type ProductListResponseType = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};
