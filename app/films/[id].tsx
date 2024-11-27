import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Film } from "@/interfaces";
import { COLORS } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { FAVOURITE_KEY } from "@/constants/keys";

const Page = () => {
  const { id } = useLocalSearchParams();
  const [film, setFilm] = useState<Film | null>();
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`);
        const data = await response.json();
        setFilm(data);
        checkFavouriteStatus(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  const checkFavouriteStatus = async (film: Film) => {
    try {
      const favourites = await AsyncStorage.getItem(FAVOURITE_KEY);
      if (favourites) {
        const favouriteFilms = JSON.parse(favourites) as Film[];
        setIsFavourite(
          favouriteFilms.some((f) => f.episode_id === film?.episode_id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavourite = async () => {
    try {
      const favourites = await AsyncStorage.getItem(FAVOURITE_KEY);
      let favouriteFilms = favourites ? JSON.parse(favourites) : [];

      if (isFavourite) {
        favouriteFilms = favouriteFilms.filter(
          (f: Film) => f.episode_id === film?.episode_id
        );
      } else {
        favouriteFilms.push(film);
      }

      await AsyncStorage.setItem(FAVOURITE_KEY, JSON.stringify(favouriteFilms));
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.error(error);
    }
  };

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
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavourite}>
              <Ionicons
                name={isFavourite ? "star" : "star-outline"}
                size={24}
                color={COLORS.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
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
