import { Text, TouchableOpacity } from "react-native";

const SearchResultItem = ({ item, onPress, isLast }) => {
  if (item.media_type === "person") return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: "#f0f0f0",
        backgroundColor: "#fff",
      }}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
        {item.name || item.title || item.original_name || item.original_title}
      </Text>
      {item.overview && (
        <Text numberOfLines={2} style={{ fontSize: 12, color: "#666" }}>
          {item.overview}
        </Text>
      )}
      {item.release_date && (
        <Text style={{ fontSize: 11, color: "#999", fontStyle: "italic" }}>
          {new Date(item.release_date).getFullYear()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SearchResultItem;