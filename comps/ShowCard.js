import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { addFavorite, isFavorite, removeFavorite } from "../utils/operationsOnLcalStorage";
import { Ionicons } from "@expo/vector-icons";

export default function ShowCard({ show, type }) {
  const stars = Array.from({ length: Math.round(show.vote_average / 2) });
  const navigation = useNavigation();
  const [isIconActive, setIsIconActive] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const isFave = await isFavorite(show.id);
      setIsIconActive(isFave ? true : false);
    };
    fetchFavorites();
  }, []);

  const handleIconPress = async () => {
    setIsIconActive((prev) => !prev);
    if (!isIconActive) {
      await addFavorite({ ...show, type });
    } else {
      await removeFavorite(show.id);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { showId: show.id, type })}
    >
      <TouchableOpacity
        onPress={handleIconPress}
        style={styles.favoriteButton}
      >
        <Ionicons
          name={isIconActive ? "heart" : "heart-outline"}
          size={16}
          color="grey"
        />
      </TouchableOpacity>

      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${show.poster_path}` }}
        style={styles.cover}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {show.original_name ?? show.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {show.release_date ?? show.first_air_date}
        </Text>
      </View>

      <View style={styles.stars}>
        {stars.map((_, i) => (
          <Ionicons key={i} name="star" size={15} color="#FFD700" />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: "#ccc",
    width: 160,
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  favoriteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    padding: 4,
  },
  cover: {
    width: 160,
    height: 210,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 10,
  },
});
