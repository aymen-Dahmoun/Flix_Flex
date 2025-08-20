import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  BounceIn,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import ShowCard from '../comps/ShowCard';
import WideCard from '../comps/WideCard';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import useFetch from '../hooks/useFetch';
import ShowsList from '../comps/ShowsList';
import useInfiniteFetch from '../hooks/useInifinitFetch';
import { AnimatedSection, AnimatedSectionTitle } from '../comps/AnimatedLayouts';
import AnimaedHeader, {HEADER_HEIGHT} from '../comps/AnimatedHearder';
import CustomDivider from '../comps/CustomDivider';


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function MoviesListScreen() {
  const scrollY = useSharedValue(0);
    const insets = useSafeAreaInsets();
  

  const { data: movies, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: loadingMovies, error: errorMovies } = useInfiniteFetch(
    "discover/movie",
    { language: "en-US", sort_by: "popularity.desc" },
    { staleTime: 60 * 60 * 1000 }
  );

  const moviesList = movies?.pages.flatMap((page) => page.results) || [];

  const { data: trending, isLoading: loadingTrending, error: errorTrending } = useFetch( "discover/movie", { include_adult: false, include_video: true, language: "en-US", page: 1, sort_by: "popularity.desc"},
    { staleTime: 60 * 60 * 1000 }
  );

  const {
    data: upcomings,
    isLoading: loadingUpcomings,
    error: errorUpcomings,
  } = useFetch("movie/upcoming", {}, { staleTime: 60 * 60 * 1000 });

  const {
    data: topRated,
    isLoading: loadingTopRated,
    error: errorTopRated
  } = useFetch("movie/top_rated", {
    language: "en-US",
    page: 1,
  }, { staleTime: 60 * 60 * 1000 });
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  const contentTopPad = insets.top + HEADER_HEIGHT;
  
  return (
    <SafeAreaProvider style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#f8f9fa', '#ffffff']}
        style={{ flex: 1 }}
      >
        <AnimaedHeader title="Movies" scrollY={scrollY} />

        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: contentTopPad }}
          onScroll={onScroll}
          >
              
          <AnimatedSection delay={300}>
            {!loadingTrending && (
              <AnimatedSectionTitle title="Trending Now" delay={400} />
            )}
            <Animated.View entering={FadeInDown.delay(500).springify()}>
              <ShowsList
                shows={trending}
                loading={loadingTrending}
                error={errorTrending}
                Component={ShowCard}
                type="movie"
              />
            </Animated.View>
          </AnimatedSection>

          <CustomDivider />


          <AnimatedSection delay={700}>
            {!loadingUpcomings && (
              <AnimatedSectionTitle title="Coming Soon" delay={800} />
            )}
            <Animated.View entering={FadeInDown.delay(900).springify()}>
              <ShowsList
                shows={upcomings}
                loading={loadingUpcomings}
                error={errorUpcomings}
                Component={ShowCard}
                type="movie"
              />
            </Animated.View>
          </AnimatedSection>

          <CustomDivider />

          <AnimatedSection delay={1100}>
            {!loadingTopRated && (
              <AnimatedSectionTitle title="Top 5 Rated" delay={1200} />
            )}
            <Animated.View entering={FadeInDown.delay(1300).springify()}>
              <ShowsList
                shows={topRated?.slice(0, 5) ?? []}
                loading={loadingTopRated}
                error={errorTopRated}
                Component={ShowCard}
                type="movie"
              />
            </Animated.View>
          </AnimatedSection>

          <CustomDivider />

          <AnimatedSection delay={1500}>
            {!loadingMovies && (
              <AnimatedSectionTitle title="Discover Movies" delay={1600} />
            )}
            <Animated.View style={{backgroundColor: 'white'}} entering={FadeInUp.delay(1700).springify()}>
              <ShowsList
                shows={moviesList}
                loading={loadingMovies}
                error={errorMovies}
                isHorizontal={false}
                Component={WideCard}
                type="movie"
              />
            </Animated.View>
          </AnimatedSection>

          {hasNextPage && (
            <Animated.View entering={BounceIn.delay(1800)}>
              <AnimatedTouchableOpacity
                style={styles.loadMoreButton}
                onPress={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                <LinearGradient
                  colors={['rgba(255, 123, 0, 1)', 'rgba(255, 87, 51, 1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>
                    {isFetchingNextPage ? "🔄 Loading..." : "✨ Load More"}
                  </Text>
                </LinearGradient>
              </AnimatedTouchableOpacity>
            </Animated.View>
          )}

          <View style={{ height: 50 }} />
        </Animated.ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadMoreButton: {
    height: 55,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 27.5,
    shadowColor: '#FF7B00',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonGradient: {
    flex: 1,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});