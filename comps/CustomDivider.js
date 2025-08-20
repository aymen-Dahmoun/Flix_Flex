import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";


export default function CustomDivider() {
  return (
    <Animated.View entering={FadeInDown.delay(600)}>
        <LinearGradient
            colors={['transparent', 'rgba(255, 123, 0, 0.3)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.animatedDivider}
        />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedDivider: {
    height: 2,
    marginVertical: 15,
    marginHorizontal: 20,
    borderRadius: 1,
  },
})