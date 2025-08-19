import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";

import ShowCard from "../comps/ShowCard";
import WideCard from "../comps/WideCard";
import ShowsList from "../comps/ShowsList";

import useFetch from "../hooks/useFetch";
import useInfiniteFetch from "../hooks/useInifinitFetch";

export default function SeriesListScreen() {
  // Infinite scroll for Discover series
  const {
    data: series,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loadingSeries,
    error: errorSeries,
  } = useInfiniteFetch(
    "discover/tv",
    {
      include_adult: false,
      include_video: true,
      language: "en-US",
      sort_by: "popularity.desc",
    },
    { staleTime: 60 * 60 * 1000 }
  );

  const seriesList = series?.pages.flatMap((page) => page.results) || [];

  // Normal fetch queries
  const {
    data: trending,
    isLoading: loadingTrending,
    error: errorTrending,
  } = useFetch(
    "tv/top_rated",
    { language: "en-US", page: 1 },
    { staleTime: 60 * 60 * 1000 }
  );

  const {
    data: popular,
    isLoading: loadingPopular,
    error: errorPopular,
  } = useFetch(
    "tv/popular",
    { language: "en-US", page: 1 },
    { staleTime: 60 * 60 * 1000 }
  );

  const {
    data: upcomings,
    isLoading: loadingUpcomings,
    error: errorUpcomings,
  } = useFetch("tv/on_the_air", {}, { staleTime: 60 * 60 * 1000 });

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.inner}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <Text style={styles.title}>Series</Text>
          <Divider style={{ ...styles.divider, width: "100%" }} bold />

          {!loadingUpcomings && (
            <Text style={styles.sectionTitle}>On Air, Next Week</Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={upcomings}
            loading={loadingUpcomings}
            error={errorUpcomings}
            Component={ShowCard}
            type="tv"
          />

          {!loadingTrending && (
            <Text style={styles.sectionTitle}>Top Rated Five</Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={trending?.slice(0, 5) ?? []}
            loading={loadingTrending}
            error={errorTrending}
            Component={ShowCard}
            type="tv"
          />

          {!loadingPopular && (
            <Text style={styles.sectionTitle}>Popular</Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={popular}
            loading={loadingPopular}
            error={errorPopular}
            isHorizontal={true}
            Component={ShowCard}
            type="tv"
          />

          {!loadingSeries && (
            <Text style={styles.sectionTitle}>Discover</Text>
          )}
          <Divider style={styles.divider} />
          <ShowsList
            shows={seriesList}
            loading={loadingSeries}
            error={errorSeries}
            isHorizontal={false}
            Component={WideCard}
            type="tv"
          />

          {hasNextPage && (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              <Text style={styles.loadMoreText}>
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
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    flex: 1,
  },
  inner: {
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    margin: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    margin: 10,
  },
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
  loadMoreText: {
    fontSize: 16,
    fontWeight: "700",
    margin: 10,
  },
});
