import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ShowCard from '../comps/ShowCard';
import WideCard from '../comps/WideCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useFetch from '../hooks/useFetch';
import ShowsList from '../comps/ShowsList';
import { Divider } from 'react-native-paper';
import useInfiniteFetch from '../hooks/useInifinitFetch';

export default function MoviesListScreen() {
  // Infinite scroll for Discover
  const {
    data: movies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loadingMovies,
    error: errorMovies,
  } = useInfiniteFetch(
    "discover/movie",
    { language: "en-US", sort_by: "popularity.desc" },
    { staleTime: 60 * 60 * 1000 }
  );

  const moviesList = movies?.pages.flatMap((page) => page.results) || [];

  // Normal fetch queries
  const {
    data: trending,
    isLoading: loadingTrending,
    error: errorTrending,
  } = useFetch(
    "discover/movie",
    {
      include_adult: false,
      include_video: true,
      language: "en-US",
      page: 1,
      sort_by: "popularity.desc",
    },
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

  return (
    <SafeAreaProvider
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <Text style={{ fontSize: 28, fontWeight: "700", margin: 10 }}>
            Movies
          </Text>
          <Divider style={{ ...styles.divider, width: "100%" }} bold />

          {!loadingTrending && (
            <Text style={{ fontSize: 24, fontWeight: "700" }}>Trending</Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={trending}
            loading={loadingTrending}
            error={errorTrending}
            Component={ShowCard}
            type="movie"
          />

          {!loadingUpcomings && (
            <Text style={{ fontSize: 24, fontWeight: "700", margin: 10 }}>
              Up Coming
            </Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={upcomings}
            loading={loadingUpcomings}
            error={errorUpcomings}
            Component={ShowCard}
            type="movie"
          />
          <Divider style={styles.divider} />

          {!loadingTopRated && (
            <Text style={{ fontSize: 24, fontWeight: "700", margin: 10 }}>
              Top Rated Five
            </Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={topRated?.slice(0, 5)}
            loading={loadingTopRated}
            error={errorTopRated}
            Component={ShowCard}
            type="movie"
          />
          <Divider style={styles.divider} />

          {!loadingMovies && (
            <Text style={{ fontSize: 24, fontWeight: "700", margin: 10 }}>
              Discover
            </Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={moviesList}
            loading={loadingMovies}
            error={errorMovies}
            isHorizontal={false}
            Component={WideCard}
            type="movie"
          />

          {hasNextPage && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", margin: 10 }}>
                {isFetchingNextPage ? "Loading..." : "More"}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 10,
    width: "90%",
    backgroundColor: "rgb(255, 123, 0)",
    alignSelf: "center",
  },
  loadMoreButton: {
    height: 40,
    width: 150,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgb(255, 115, 0)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
