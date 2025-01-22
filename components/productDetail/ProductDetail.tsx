import { useState } from "react";
import {
  Alert,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { registerForPushNotificationsAsync } from "utils/registerForPushNotificationsAsync";
import * as Notifications from 'expo-notifications'

interface ProductDetailProps {
  product?: ProductType;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width / 1.5, 400);

  async function ScheduleNotifications(date: Date) {
    let pushNotificationId
    const result = await registerForPushNotificationsAsync()
    if (result === 'granted') {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Thing is due!",
        },
        trigger: {
          date: date,
          channelId: 'default',
        },
      })
    } else {
      Alert.alert('Unable to schedule notification', 'Please enable notifications')
    }
  }

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
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text>Set reminder</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <View style={styles.container}>
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(_, date) => {
              if (date) {
                ScheduleNotifications(date);
                setShowDatePicker(false);
              }
            }}
          />
        </View>
      )}
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
