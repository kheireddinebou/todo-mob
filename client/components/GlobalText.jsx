import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function GlobalText({ style, children, onPress }) {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Text onPress={onPress} style={[style, { fontFamily: "Poppins" }]}>
      {children}
    </Text>
  );
}
