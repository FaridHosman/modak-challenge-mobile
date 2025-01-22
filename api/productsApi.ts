import { categoriesToDropdownOption } from "utils/functions";
import { CategoryType, SortOptionsValueType } from "utils/types";

const API_URL = "https://dummyjson.com/products";

export async function getProducts<ProductListResponseType>(
  filterBy?: string,
  sortBy?: SortOptionsValueType,
) {
  let sortParams = "";
  let filterParams = "";
  if (sortBy) {
    const sortOption = sortBy.split("-")[0];
    const sortOrder = sortBy.split("-")[1];
    sortParams = `?sortBy=${sortOption}&order=${sortOrder}`;
  }
  if (filterBy) {
    filterParams = `/category/${filterBy}`;
  }
  const response = await fetch(`${API_URL}${filterParams}${sortParams}`);
  const data: ProductListResponseType = await response.json();
  return data;
}

export async function getProduct<ProductType>(productId?: string) {
  const response = await fetch(`${API_URL}/${productId}`);
  const data: ProductType = await response.json();
  return data;
}

export async function getCategoriesAsDropdownOptions() {
  const response = await fetch(`${API_URL}/categories`);
  const data: CategoryType[] = await response.json();
  return categoriesToDropdownOption(data);
}
