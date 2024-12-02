import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import { Person } from "@/interfaces";
import CharacterCard from "@/components/CharacterCard";
import ListEmptyComponent from "@/components/ListEmptyComponent";

const Page = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPeople = async (query: string = "", url: string | null = null) => {
    setLoading(true);

    try {
      const apiUrl = url || `https://swapi.dev/api/people/?search=${query}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPeople((prevPeople) =>
        url ? [...prevPeople, ...data.results] : data.results
      );
      setNextPage(data.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSearch = () => {
    fetchPeople(searchInput);
  };

  const handleLoadMore = () => {
    if (nextPage && !loadingMore) {
      setLoadingMore(true);
      fetchPeople(searchInput, nextPage);
    }
  };
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#FFE81F" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Characters"
        placeholderTextColor={COLORS.inactive}
        onChangeText={setSearchInput}
        value={searchInput}
      />
      <Button onPress={handleSearch} title="Search" color={COLORS.text} />
      <FlatList
        data={people}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CharacterCard item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchPeople}
            tintColor={COLORS.text}
          />
        }
        ListEmptyComponent={() => (
          <ListEmptyComponent
            loading={loading}
            message="No characters found"
            dataType="Characters"
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
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
  searchBar: {
    backgroundColor: COLORS.itemBackground,
    color: COLORS.text,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  footerLoader: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
