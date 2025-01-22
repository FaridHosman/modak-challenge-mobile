import { getProduct } from "api/productsApi";
import { useLocalSearchParams } from "expo-router";
import { useProductQuery } from "hooks/useProductQuery";
import { StyleSheet, Text, View } from "react-native";
import { ProductType } from "utils/types";

export function product() {
  const { id } = useLocalSearchParams();
  const { isLoading, data, error } = useProductQuery<ProductType>(() => getProduct(id as string), 'product-detail', id as string);

  return (
    <View style={styles.container}>
      <Text>Details of user {id} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
