import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { addFavorite, getFavorites, isFavorite, removeFavorite } from "../utils/operationsOnLcalStorage";

export default function MovieCard({ show, type }) {
    const stars = Array.from({ length: Math.round(show.vote_average / 2) });
    const navigation = useNavigation();
    const [isIconActive, setIsIConActive] = useState(false);
    
      useEffect(() => {
        const fetchFavorites = async () => {
          const isFave = await isFavorite(show.id);
          setIsIConActive(isFave? true : false);
        };
        fetchFavorites();
      }, []);

    const handleIconPress = async ()=>{
        setIsIConActive((prevColor) => (prevColor === true ? false : true));
        if (!isIconActive){
            await addFavorite({...show, type:type})
        } else{
            await removeFavorite(show.id)
        }
    }
    return (
  <TouchableOpacity onPress={() => navigation.navigate('Details', { showId: show.id, type: type })}>
    <Card style={styles.Card} mode='contained'>
      <View style={{ position: 'absolute', right: 10, top: 10, zIndex: 2 }}>
        <IconButton
          icon={isIconActive? 'heart' : 'heart-outline'}
          size={16}
          color={'grey'}
          onPress={handleIconPress}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.70)', borderRadius: 16 }}
        />
      </View>
      <Card.Cover
        source={{ uri: `https://image.tmdb.org/t/p/w500/${show.poster_path}` }}
        style={styles.Cover}
      />
      <Card.Title
        title={show.original_name ?? show.title}
        subtitle={show.release_date ?? show.first_air_date}
        titleNumberOfLines={1}
        subtitleNumberOfLines={1}
        titleStyle={styles.title}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginBottom: 10 }}>
        {stars.map((_, i) => (
          <IconButton
            key={i}
            icon="star"
            size={15}
            iconColor="#FFD700"
            style={{ padding: 0, margin: 0, width: 15, height: 15 }}
          />
        ))}
      </View>
    </Card>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    Card: {
        margin: 5,
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: '#ccc',
        width: 160,
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: "hidden",
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    Cover: {
        width: 160,
        height: 210,
        alignSelf: 'center',
        overflow: 'hidden',
        borderRadius: 6,
    },
})