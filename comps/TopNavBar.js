import { useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useSearch from "../hooks/useSearch";
import SearchResultsList from "./SearchResultList";

export default function TopNavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { result, loading, err } = useSearch(searchQuery);
  const navigation = useNavigation();

  const handleItemPress = (item) =>
    navigation.navigate("Details", { showId: item.id, type: item.media_type });

  return (
    <View > 
      <LinearGradient
        colors={["#ff7300", "#ff9a3c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.searchWrapper}
      >
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClearIconPress={() => setSearchQuery("")}
          style={styles.searchbar}
          inputStyle={{ fontSize: 16 }}
          iconColor="#ff7300"
          clearIcon="close-circle"
        />
      </LinearGradient>

      {searchQuery.length > 0 && (
      <View style={styles.resultsModal} pointerEvents="box-none">
        <SearchResultsList
          results={result}
          loading={loading}
          error={err}
          onItemPress={handleItemPress}
        />
      </View>
    )}

    </View>
  );
}

const styles = {
  searchbar: {
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 2,
    height: 50,
  },
  searchWrapper: {
    padding: 12,
  },
  resultsModal: {
    position: "absolute",
    top: 65,
    left: 12,
    right: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    maxHeight: 400,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 999,
  },
};
