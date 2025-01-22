import { Link } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { theme } from "theme";
import { ProductType } from "utils/types";

interface ProductDetailProps {
  product?: ProductType;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width / 1.5, 400);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product?.title}</Text>
      <FlatList
        data={product?.images}
        horizontal
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: 6,
              resizeMode: "contain",
            }}
          />
        )}
        keyExtractor={(item) => item}
        style={{ height: imageSize, flexGrow: 0 }}
      />
      <Text style={styles.brand}>{product?.brand}</Text>
      <Text style={styles.description}>{product?.description}</Text>
      <Text style={styles.price}>{product?.price}$</Text>
      <Text style={styles.discount}>{product?.discountPercentage} % Off!</Text>
      <Text style={styles.stock}>{product?.stock} left in stock</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
      <Link href="/modal" style={styles.button}>
        <TouchableOpacity>
          <Text>Set reminder</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorLightBlue,
    flex: 1,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colorPurple,
    marginBottom: 10,
  },
  brand: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  discount: {
    fontSize: 16,
    color: theme.colorPurple,
  },
  stock: {
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colorOrange,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    textAlign: "center",
  },
});
