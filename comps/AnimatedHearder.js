import Animated, { Extrapolate, FadeInDown, interpolate, Layout, useAnimatedStyle } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function AnimatedHeader({ title, scrollY }) {
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 150], [0, -20], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, 150], [1, 0.9], Extrapolate.CLAMP);
    const height = interpolate(scrollY.value, [0, 150], [120, 0], Extrapolate.CLAMP);

    return {
      opacity,
      height,
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <Animated.View style={[styles.header, headerAnimatedStyle]} exiting={FadeInDown.delay(200).springify()} layout={Layout.springify()}>
      <LinearGradient
        colors={['rgba(255, 123, 0, 0.8)', 'rgba(255, 87, 51, 0.6)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Animated.Text 
          style={styles.headerTitle}
          entering={FadeInDown.delay(200).springify()}
        >
          {title}
        </Animated.Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  headerGradient: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#FF7B00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});