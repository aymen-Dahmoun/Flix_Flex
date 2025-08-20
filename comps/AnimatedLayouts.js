import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp, SlideInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const AnimatedSection = ({ children, delay = 0, direction = 'down' }) => {
    const animation = direction === 'down' ? FadeInDown : FadeInUp;
    return (
      <Animated.View entering={animation.delay(delay).springify()}>
        {children}
      </Animated.View>
    );
  };

export const AnimatedSectionTitle = ({ title, delay = 0 }) => (
    <Animated.View entering={SlideInLeft.delay(delay).springify()}>
      <LinearGradient
        colors={['rgba(255, 123, 0, 0.1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.titleContainer}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.titleAccent} />
      </LinearGradient>
    </Animated.View>
  );


const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2c3e50',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titleAccent: {
    width: 30,
    height: 4,
    backgroundColor: '#FF7B00',
    borderRadius: 2,
    shadowColor: '#FF7B00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});