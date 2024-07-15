import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View className="h-screen justify-center items-center">
      <ActivityIndicator size="large" color={"white"} />
    </View>
  );
}