import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Film } from "@/interfaces";
import { COLORS } from "@/constants/colors";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) {
    return (
      <View>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  if (!film) {
    return (
      <View>
        <Text style={{ color: "#fff" }}>Film not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>Director: {film.director}</Text>
      <Text style={styles.details}>Producer: {film.producer}</Text>
      <Text style={styles.details}>Released: {film.release_date}</Text>
      <Text style={styles.crawl}>{film.opening_crawl}</Text>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.text,
    alignSelf: "center",
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.text,
  },
  crawl: {
    fontSize: 16,
    marginTop: 8,
    color: COLORS.text,
    fontStyle: "italic",
  },
});
