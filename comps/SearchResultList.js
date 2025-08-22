import {  ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import SearchResultItem from "./SerachResultItem";

const SearchResultsList = ({ results, loading, error, onItemPress }) => {
  if (loading)
    return (
      <View style={styles.stateBox}>
        <ActivityIndicator
         size="large" color="#ff7300" />
        <Text style={styles.stateText}>Searching...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.stateBox}>
        <Text style={[styles.stateText, { color: "#d32f2f" }]}>
          {error.message || "Something went wrong"}
        </Text>
      </View>
    );

  if (!results?.length)
    return (
      <View style={styles.stateBox}>
        <Text style={[styles.stateText, { color: "#999" }]}>No results found</Text>
      </View>
    );

  return (
    <ScrollView style={{ backgroundColor: "#fff", borderRadius: 12, maxHeight: 400 }}>
      {results.map((item, idx) => (
        <SearchResultItem
          key={item.id || idx}
          item={item}
          isLast={idx === results.length - 1}
          onPress={() => onItemPress(item)}
        />
      ))}
    </ScrollView>
  );
};

export default SearchResultsList;


const styles = {
  stateBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  stateText: { marginTop: 8, fontSize: 14 },
};
