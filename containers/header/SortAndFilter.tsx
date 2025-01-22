import { getCategoriesAsDropdownOptions } from "api/productsApi";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { sortOptions } from "utils/constants";
import { useProductQuery } from "utils/hooks";
import { SortOptionsValueType } from "utils/types";

interface SortAndFilterProps {
  setFilterBy: (value: string) => void
  setSortBy: (value: SortOptionsValueType) => void
}

export function SortAndFilter({ setFilterBy, setSortBy }: SortAndFilterProps) {
  const { data, isLoading, error, isSuccess } = useProductQuery(() => getCategoriesAsDropdownOptions(), 'categories');

  return (
    <View style={styles.container}>
      <Dropdown
        placeholder="Sort By"
        style={styles.dropdown}
        data={sortOptions}
        labelField={"label"}
        valueField={"value"}
        onChange={(e) => setSortBy(e.value)}
      />
      <Dropdown
        placeholder={error ? "Error fetching categories" : isLoading ? "Loading categories" : "All categories"}
        style={styles.dropdown}
        data={isSuccess ? data : []}
        labelField={"label"}
        valueField={"value"}
        onChange={(e) => setFilterBy(e.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
    gap: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  }
});