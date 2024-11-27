import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Film } from "@/interfaces";
import { COLORS } from "@/constants/colors";
import { Link } from "expo-router";

const FilmItem: React.FC<{ item: Film }> = ({ item }) => {
  //Ensures ID corresponds to correct film title
  const id = item.url.split("/").filter(Boolean).pop();

  return (
    <Link href={`/films/${id}`} asChild>
      <TouchableOpacity>
        <View style={styles.filmItem}>
          <Text style={styles.filmTitle}>{item.title}</Text>
          <Text style={styles.filmDetails}>Episode: {item.episode_id}</Text>
          <Text style={styles.filmDetails}>Released: {item.release_date}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default FilmItem;

const styles = StyleSheet.create({
  filmItem: {
    backgroundColor: COLORS.background,
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
