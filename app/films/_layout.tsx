import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS } from "@/constants/colors";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}>
      <Stack.Screen name="index" options={{ headerTitle: "All Films" }} />
      <Stack.Screen name="[id]" options={{ headerTitle: "Film Details" }} />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({});
