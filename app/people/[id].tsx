import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Person } from "@/interfaces";
import { COLORS } from "@/constants/colors";

const Page = () => {
  const { id } = useLocalSearchParams();

  const [person, setPerson] = useState<Person | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!person) {
    return <Text>Person not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{person.name}</Text>
      </View>
      <Text style={styles.detail}>Height: {person.height} cm</Text>
      <Text style={styles.detail}>Mass: {person.mass} kg</Text>
      <Text style={styles.detail}>Hair Color: {person.hair_color}</Text>
      <Text style={styles.detail}>Skin Color: {person.skin_color}</Text>
      <Text style={styles.detail}>Eye Color: {person.eye_color}</Text>
      <Text style={styles.detail}>Birth Year: {person.birth_year}</Text>
      <Text style={styles.detail}>Gender: {person.gender}</Text>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  detail: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
});
