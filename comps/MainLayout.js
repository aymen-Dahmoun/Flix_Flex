import React from "react";
import TopNavBar from "./TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { View } from "react-native";

export default function MainLayout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <TopNavBar />
      <View style={{ flex: 1 }}>{children}</View>
      <BottomNavBar />
    </View>
  );
}