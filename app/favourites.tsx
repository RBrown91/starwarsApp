import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Film } from "@/interfaces";
import { FAVOURITE_KEY } from "@/constants/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";

const Page = () => {
  const [favourites, setFavourties] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavourites = async () => {
    try {
      const favourites = await AsyncStorage.getItem(FAVOURITE_KEY);
      if (favourites) {
        setFavourties(JSON.parse(favourites));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavourites();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavourites();
  };

  const removeFavourite = async (film: Film) => {
    const updateFavourites = favourites.filter(
      (f) => f.episode_id !== film.episode_id
    );
    setFavourties(updateFavourites);

    try {
      await AsyncStorage.setItem(
        FAVOURITE_KEY,
        JSON.stringify(updateFavourites)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Film }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeFavourite(item)}>
        <Ionicons name="trash-outline" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.itemBackground,
    margin: 12,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
