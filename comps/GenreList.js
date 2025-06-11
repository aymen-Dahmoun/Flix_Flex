import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function GenreList({ genres = [], selectedGenres = [], onToggle, title }) {
  return (
    <View style={{ marginBottom: 16 }}>
      {title && (
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{title}</Text>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            onPress={() => onToggle(genre.id)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              margin: 4,
              backgroundColor: selectedGenres.includes(genre.id) ? 'orange' : '#eee',
              borderWidth: 1,
              borderColor: selectedGenres.includes(genre.id) ? 'orange' : '#ccc',
            }}
          >
            <Text style={{
              color: selectedGenres.includes(genre.id) ? '#fff' : '#333',
              fontWeight: '600'
            }}>
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}