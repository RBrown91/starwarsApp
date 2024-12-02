import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Person } from "@/interfaces";
import { COLORS } from "@/constants/colors";
import { Link } from "expo-router";

function capitalizeFirstLetter(val: String) {
  if (String(val).charAt(0) === "n") return String(val);
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const CharacterCard: React.FC<{ item: Person }> = ({ item }) => {
  const id = item.url.split("/").filter(Boolean).pop();
  return (
    <Link href={`/people/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.filmItem}>
          <Text style={styles.filmTitle}>{item.name}</Text>
          <Text style={styles.filmDetails}>Born: {item.birth_year}</Text>
          <Text style={styles.filmDetails}>
            Gender: {capitalizeFirstLetter(item.gender)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  filmItem: {
    backgroundColor: COLORS.itemBackground,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  filmDetails: {
    fontSize: 14,
    color: "#fff",
  },
});
