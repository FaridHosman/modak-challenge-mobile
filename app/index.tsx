import { getProducts } from "api/productsApi";
import { ErrorAndLoadingHandler } from "components/errorAndLoadingHandler/ErrorAndLoadingHandler";
import { ProductCard } from "components/productCard/ProductCard";
import { SortAndFilter } from "containers/header/SortAndFilter";
import { StatusBar } from "expo-status-bar";
import { useProductQuery } from "hooks/useProductQuery";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from "theme";
import { ProductListResponseType, SortOptionsValueType } from "utils/types";


export default function App() {
  const [filterBy, setFilterBy] = useState<string>()
  const [sortBy, setSortBy] = useState<SortOptionsValueType>()
  const { data, isLoading, error } = useProductQuery<ProductListResponseType>(() => getProducts(filterBy, sortBy), 'products', filterBy, sortBy);
  return (
    <View style={styles.container}>
      <ErrorAndLoadingHandler isLoading={isLoading} error={error}>
        <FlatList
          style={styles.list}
          data={data?.products}
          ListHeaderComponent={
            <SortAndFilter
              setFilterBy={setFilterBy}
              setSortBy={setSortBy} />
          }
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </ErrorAndLoadingHandler>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colorLightBlue,
  },
  list: {
    width: '100%',
  }
});
