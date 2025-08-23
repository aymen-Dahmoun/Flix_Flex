import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { firebaseAuth } from '../firebaseClient';
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/logo.jpg";
import useUserGenres from "../hooks/useUserGenres";
import useFetch from "../hooks/useFetch";
import { ScrollView } from "react-native-gesture-handler";
import { AnimatedSection, AnimatedSectionTitle } from "../comps/AnimatedLayouts";
import ShowsList from "../comps/ShowsList";
import Animated, { FadeInUp, FadeInDown, SlideInLeft, SlideInRight } from "react-native-reanimated";
import ShowCard from "../comps/ShowCard";

export default function UserScreen({ navigation }) {
  const { user } = useAuth();
  const { data: genres, isLoading } = useUserGenres();
  const { width } = Dimensions.get("window");

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
    <ScrollView style={{ backgroundColor: "#f8f9fa", flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.gradientBackground}>
          <LinearGradient
            colors={['rgba(255, 115, 0, 0.1)', 'rgba(255, 115, 0, 0.05)', 'transparent']}
            style={styles.gradient}
          />
        </View>
        
        <Animated.View 
          style={styles.welcomeContainer}
          entering={FadeInDown.delay(200).springify()}
        >
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.emailText} numberOfLines={1}>
            {user?.email}
          </Text>
        </Animated.View>

        <Animated.View 
          style={styles.profileImageContainer}
          entering={FadeInUp.delay(400).springify()}
        >
          <View style={styles.profileImageBorder}>
            <Image
              style={styles.profileImage}
              source={logo}
            />
          </View>
        </Animated.View>

        {/* Action Buttons with Enhanced Design */}
        <View style={styles.buttonContainer}>
          <Animated.View entering={SlideInLeft.delay(600).springify()}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton, { width: width * 0.7}]}
              onPress={() => navigation.navigate("Favorite")}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Favorites</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={SlideInRight.delay(800).springify()}>
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton, { width: width * 0.7}]} 
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Log Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

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

const styles = StyleSheet.create({
  // Enhanced Header Styles
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7f8c8d',
    maxWidth: 280,
    textAlign: 'center',
  },
  
  // Enhanced Profile Image Styles
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  profileImageBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    backgroundColor: '#fff',
    padding: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 96,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
    gap: 15,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: 'rgb(255, 115, 0)',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'rgb(255, 115, 0)',
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  buttonIcon: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryButtonText: {
    color: 'rgb(255, 115, 0)',
  },
  
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
});