import { getProduct } from "api/productsApi";
import { ErrorAndLoadingHandler } from "components/errorAndLoadingHandler/ErrorAndLoadingHandler";
import { useLocalSearchParams } from "expo-router";
import { useProductQuery } from "hooks/useProductQuery";
import { Text } from "react-native";
import { ProductType } from "utils/types";

export default function Product() {
  const { id } = useLocalSearchParams();
  const { isLoading, data, error } = useProductQuery<ProductType>(
    () => getProduct(id as string),
    "product-detail",
    id as string,
  );

  return (
    <ErrorAndLoadingHandler isLoading={isLoading} error={error}>
      <Text>Details of product {id} </Text>
    </ErrorAndLoadingHandler>
  );
}
