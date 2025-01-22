import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { theme } from "theme";

interface ErrorAndLoadingHandlerProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error: Error | null;
}

export function ErrorAndLoadingHandler({
  children,
  isLoading,
  error,
}: ErrorAndLoadingHandlerProps) {
  if (error) {
    return <Text style={styles.error}>Unable to fetch product data</Text>; // Or error.message
  } else if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colorPurple} />;
  } else {
    return <View>{children}</View>;
  }
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: theme.colorLightRed,
    textAlign: "center",
  },
});
