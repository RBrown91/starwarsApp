import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

type ListEmptyComponentProps = {
  loading: boolean;
  message?: string;
  dataType: string;
};

const ListEmptyComponent = ({
  loading,
  message = "No films found",
  dataType,
}: ListEmptyComponentProps) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.fetchingContainer}>
          <ActivityIndicator size={"large"} color={COLORS.text} />
          <Text style={styles.emptyText}>Fetching {dataType}</Text>
        </View>
      ) : (
        <Text style={styles.emptyText}>{message}</Text>
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  emptyText: {
    color: "#666",
    fontSize: 24,
    fontWeight: "bold",
  },
  fetchingContainer: {
    gap: 16,
    marginTop: 24,
  },
});
