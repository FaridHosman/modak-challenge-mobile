import { getProducts } from "api/productsApi";
import { ErrorAndLoadingHandler } from "components/errorAndLoadingHandler/ErrorAndLoadingHandler";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useProductQuery } from "utils/hooks";
import { ProductListResponseType, SortOptionsValueType } from "utils/types";


export default function App() {
  const [filterBy, setFilterBy] = useState<string>()
  const [sortBy, setSortBy] = useState<SortOptionsValueType>()
  const { data, isLoading, error } = useProductQuery<ProductListResponseType>(() => getProducts(filterBy, sortBy), 'products', filterBy, sortBy);
  return (
    <View style={styles.container}>
      <ErrorAndLoadingHandler isLoading={isLoading} error={error}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </ErrorAndLoadingHandler>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
