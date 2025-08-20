import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import useActiveRouteName from "../hooks/useActiveRouteName";


export default function BottomNavBar() {
  const navigation = useNavigation();
  const currentRoute = useActiveRouteName();

  // Map route names to which tab should be active
  const isActive = (key) => {
    if (key === "movie")
      return ["Movies", "MovieDetails", "Details"].includes(currentRoute);
    if (key === "series")
      return ["Series", "SeriesDetails"].includes(currentRoute);
    if (key === "profile")
      return ["Profile", "Settings"].includes(currentRoute);
    return false;
  };

  const go = (route) => navigation.navigate(route);

  return (
    <LinearGradient
      colors={["#ff7300", "#ff9a3c"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.wrapper}
    >
      <View style={styles.container}>
        <IconButton
          icon="movie"
          size={28}
          iconColor={isActive("movie") ? "#fff" : "rgba(255,255,255,0.7)"}
          onPress={() => go("Movies")}
          style={isActive("movie") ? styles.activeButton : null}
          animated
        />
        <IconButton
          icon="television"
          size={28}
          iconColor={isActive("series") ? "#fff" : "rgba(255,255,255,0.7)"}
          onPress={() => go("Series")}
          style={isActive("series") ? styles.activeButton : null}
          animated
        />
        <IconButton
          icon="account"
          size={28}
          iconColor={isActive("profile") ? "#fff" : "rgba(255,255,255,0.7)"}
          onPress={() => go("Profile")}
          style={isActive("profile") ? styles.activeButton : null}
          animated
        />
      </View>
    </LinearGradient>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    paddingVertical: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 30,
  },
};
