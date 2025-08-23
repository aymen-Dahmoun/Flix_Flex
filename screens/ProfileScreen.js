import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from '../firebaseClient';
import logo from "../assets/logo.jpg";
import useUserGenres from "../hooks/useUserGenres";
import useFetch from "../hooks/useFetch";
import { ScrollView } from "react-native-gesture-handler";
import { AnimatedSection, AnimatedSectionTitle } from "../comps/AnimatedLayouts";
import ShowsList from "../comps/ShowsList";
import Animated, { FadeInUp } from "react-native-reanimated";
import ShowCard from "../comps/ShowCard";

export default function UserScreen({ navigation }) {
  const { user } = useAuth();
  const { data: genres, isLoading } = useUserGenres();

  const genreQuery = genres?.join("|"); // OR for TMDB
    console.log('genres', genreQuery)


  const { data: movies, isLoading: isMovieLoading, error: movieError } = useFetch("discover/movie", {
    with_genres: genreQuery,
    sort_by: "popularity.desc",
  }, { enabled: !!genreQuery });

  const { data: tv, isLoading: isTvLoading, error: tvError } = useFetch("discover/tv", {
    with_genres: genreQuery,
    sort_by: "popularity.desc",
  }, { enabled: !!genreQuery });

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      navigation.replace("Login");
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
      style={{ width: 120, height: 180, marginRight: 10, borderRadius: 10 }}
    />
  );

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: "800" }}>
        <Text style={{ fontSize: 28, fontWeight: "600" }}> Hello </Text>
        {user?.email}
      </Text>

      <Image
        style={{
          height: 180,
          width: 180,
          alignSelf: "center",
          borderRadius: 90,
          marginBottom: 20,
        }}
        source={logo}
      />

      {/* Favorites */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Favorite")}
      >
        <Text style={styles.buttonText}>Favorites</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Recommendations */}
      {!isLoading && (
        <View style={{ marginTop: 20, marginBottom: 100 }}>
          <AnimatedSection delay={1500}>
            {!isMovieLoading && (
            <AnimatedSectionTitle title="Recommeded Movies" delay={1600} />
            )}
            <Animated.View style={{backgroundColor: 'white'}} entering={FadeInUp.delay(1700).springify()}>
            <ShowsList
                shows={movies}
                loading={isMovieLoading}
                error={movieError}
                Component={ShowCard}
                type="movie"
            />
            </Animated.View>
        </AnimatedSection>

          <AnimatedSection delay={1500}>
            {!isTvLoading && (
            <AnimatedSectionTitle title="Recommeded TV shows" delay={1600} />
            )}
            <Animated.View style={{backgroundColor: 'white'}} entering={FadeInUp.delay(1700).springify()}>
            <ShowsList
                shows={tv}
                loading={isTvLoading}
                error={tvError}
                Component={ShowCard}
                type="tv"
            />
            </Animated.View>
        </AnimatedSection>
        </View>
      )}
    </ScrollView>
  );
}

const styles = {
  button: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgb(255, 115, 0)",
    borderRadius: 40,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(255, 115, 0)",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
};
