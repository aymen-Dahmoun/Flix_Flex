import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeInUp, BounceIn, useSharedValue, useAnimatedScrollHandler } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import ShowCard from "../comps/ShowCard";
import WideCard from "../comps/WideCard";
import ShowsList from "../comps/ShowsList";
import useFetch from "../hooks/useFetch";
import useInfiniteFetch from "../hooks/useInifinitFetch";

import { AnimatedSection, AnimatedSectionTitle } from "../comps/AnimatedLayouts";
import AnimatedHeader, { HEADER_HEIGHT } from "../comps/AnimatedHearder";
import CustomDivider from "../comps/CustomDivider";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function SeriesListScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const { data: series, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: loadingSeries, error: errorSeries } =
    useInfiniteFetch("discover/tv", { include_adult: false, include_video: true, language: "en-US", sort_by: "popularity.desc" }, { staleTime: 60 * 60 * 1000 });

  const seriesList = series?.pages.flatMap((p) => p.results) || [];

  const { data: trending, isLoading: loadingTrending, error: errorTrending } =
    useFetch("tv/top_rated", { language: "en-US", page: 1 }, { staleTime: 60 * 60 * 1000 });

  const { data: popular, isLoading: loadingPopular, error: errorPopular } =
    useFetch("tv/popular", { language: "en-US", page: 1 }, { staleTime: 60 * 60 * 1000 });

  const { data: upcomings, isLoading: loadingUpcomings, error: errorUpcomings } =
    useFetch("tv/on_the_air", {}, { staleTime: 60 * 60 * 1000 });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const contentTopPad = insets.top + HEADER_HEIGHT

  return (
    <SafeAreaProvider style={styles.container}>
      <LinearGradient colors={["#ffffff", "#f8f9fa", "#ffffff"]} style={{ flex: 1 }}>
        <AnimatedHeader title="Series" scrollY={scrollY} />

        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: contentTopPad }}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          <AnimatedSection delay={300}>
            {!loadingUpcomings && <AnimatedSectionTitle title="On Air, Next Week" delay={400} />}
            <Animated.View entering={FadeInDown.delay(500).springify()}>
              <ShowsList shows={upcomings} loading={loadingUpcomings} error={errorUpcomings} Component={ShowCard} type="tv" />
            </Animated.View>
          </AnimatedSection>

          <CustomDivider />

          <AnimatedSection delay={700}>
            {!loadingTrending && <AnimatedSectionTitle title="Top 5 Rated" delay={800} />}
            <Animated.View entering={FadeInDown.delay(900).springify()}>
              <ShowsList shows={trending?.slice(0, 5) ?? []} loading={loadingTrending} error={errorTrending} Component={ShowCard} type="tv" />
            </Animated.View>
          </AnimatedSection>

          <CustomDivider />

          <AnimatedSection delay={1100}>
            {!loadingPopular && <AnimatedSectionTitle title="Popular" delay={1200} />}
            <Animated.View entering={FadeInDown.delay(1300).springify()}>
              <ShowsList shows={popular} loading={loadingPopular} error={errorPopular} Component={ShowCard} type="tv" />
            </Animated.View>
          </AnimatedSection>

          <CustomDivider />

          <AnimatedSection delay={1500}>
            {!loadingSeries && <AnimatedSectionTitle title="Discover Series" delay={1600} />}
            <Animated.View entering={FadeInUp.delay(1700).springify()}>
              <ShowsList shows={seriesList} loading={loadingSeries} error={errorSeries} isHorizontal={false} Component={WideCard} type="tv" />
            </Animated.View>
          </AnimatedSection>

          {hasNextPage && (
            <Animated.View entering={BounceIn.delay(1800)}>
              <AnimatedTouchableOpacity style={styles.loadMoreButton} onPress={() => fetchNextPage()} disabled={isFetchingNextPage}>
                <LinearGradient colors={["rgba(255, 123, 0, 1)", "rgba(255, 87, 51, 1)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>{isFetchingNextPage ? "🔄 Loading..." : "✨ Load More"}</Text>
                </LinearGradient>
              </AnimatedTouchableOpacity>
            </Animated.View>
          )}
        </Animated.ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  loadMoreButton: {
    height: 55,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 27.5,
    shadowColor: "#FF7B00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonGradient: { flex: 1, borderRadius: 27.5, justifyContent: "center", alignItems: "center" },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
