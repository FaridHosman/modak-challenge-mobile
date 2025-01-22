import { getProducts } from "api/productsApi";
import { ErrorAndLoadingHandler } from "components/errorAndLoadingHandler/ErrorAndLoadingHandler";
import { ProductCard } from "components/productCard/ProductCard";
import { SortAndFilter } from "components/sortAndFilter/SortAndFilter";
import { StatusBar } from "expo-status-bar";
import { useProductQuery } from "hooks/useProductQuery";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { theme } from "theme";
import { ProductListResponseType, SortOptionsValueType } from "utils/types";

export default function App() {
  const [filterBy, setFilterBy] = useState<string>();
  const [sortBy, setSortBy] = useState<SortOptionsValueType>();
  const { data, isLoading, error } = useProductQuery<ProductListResponseType>(
    () => getProducts(filterBy, sortBy),
    "products",
    filterBy,
    sortBy,
  );
  return (
    <View style={styles.container}>
      <SortAndFilter setFilterBy={setFilterBy} setSortBy={setSortBy} />
      <ErrorAndLoadingHandler isLoading={isLoading} error={error}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 150 }} // Gotta be a better way
          style={styles.list}
          data={data?.products}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </ErrorAndLoadingHandler>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorLightBlue,
    flex: 1,
  },
  list: {
    width: "100%",
  },
});
