import React from "react";
import Animated, {
  Extrapolate,
  FadeInDown,
  interpolate,
  Layout,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const HEADER_HEIGHT = 88;

export default function AnimatedHeader({ title, scrollY, height = HEADER_HEIGHT }) {
  const insets = useSafeAreaInsets();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 120], [0, -24], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, 120], [1, 0.96], Extrapolate.CLAMP);

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          top: insets.top,
          height,
        },
        headerAnimatedStyle,
      ]}
      exiting={FadeInDown.delay(120).springify()}
      layout={Layout.springify()}
      pointerEvents="none"
    >
      <LinearGradient
        colors={["rgba(255, 123, 0, 0.9)", "rgba(255, 87, 51, 0.7)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Animated.Text style={styles.headerTitle} entering={FadeInDown.delay(120).springify()}>
          {title}
        </Animated.Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 20,
    justifyContent: "flex-end",
    overflow: "visible",
  },
  headerGradient: {
    marginHorizontal: 16,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: "#FF7B00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
