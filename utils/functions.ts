import { CategoryType, DropdownOptionType } from "./types";

export function categoriesToDropdownOption(categories: CategoryType[]): DropdownOptionType[] {
  return categories.map(category => ({
    value: category.slug,
    label: category.name
  }))
}