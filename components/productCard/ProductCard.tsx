import { Link, useRouter } from "expo-router";
import { View, Image, Text, StyleSheet } from "react-native";
import { theme } from "theme";
import { ProductType } from "utils/types";

interface ProductCardProps {
  product: ProductType
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  return (
    <Link style={styles.container} href={{
      pathname: '/product/[id]',
      params: { id: product.id },
    }}>
      <Image
        style={styles.image}
        source={{ uri: product.thumbnail }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.rating}>★ {product.rating} / 5</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: theme.colorLightBlue,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colorBlue,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3, //shadow props only work on iOS. On Android you'll need to add an elevation instead.
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  content: {
    justifyContent: "space-between",
    marginLeft: 18,

  },
  title: {
    color: theme.colorPurple,
    fontSize: 20,
    fontWeight: "bold"
  },
  price: {

  },
  rating: {

  },
})