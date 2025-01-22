import { getProduct } from "api/productsApi";
import { ErrorAndLoadingHandler } from "components/errorAndLoadingHandler/ErrorAndLoadingHandler";
import { ProductDetail } from "components/productDetail/ProductDetail";
import { useLocalSearchParams } from "expo-router";
import { useProductQuery } from "hooks/useProductQuery";
import { StyleSheet, View } from "react-native";
import { ProductType } from "utils/types";

export default function Product() {
  const { id } = useLocalSearchParams();
  const { isLoading, data, error } = useProductQuery<ProductType>(
    () => getProduct(id as string),
    "product-detail",
    id as string,
  );

  return (
    <View style={styles.container}>
      <ErrorAndLoadingHandler isLoading={isLoading} error={error}>
        <ProductDetail product={data} />
      </ErrorAndLoadingHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
