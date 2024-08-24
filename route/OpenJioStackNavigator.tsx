import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "./setdirectory";
import OpenJioScreen from "@/screens/OpenJio/OpenJio";
import OpenJioPost from "@/screens/OpenJio/OpenJioPost";
import OpenJioNewPost from "@/screens/OpenJio/OpenJioNewPost";

const OpenJioStack = createNativeStackNavigator<RootStackParamList>();

function OpenJioStackGroup() {
  return (
    <OpenJioStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <OpenJioStack.Screen name="OpenJio" component={OpenJioScreen} />
      <OpenJioStack.Screen name="OpenJioPost" component={OpenJioPost} />
      <OpenJioStack.Screen name="OpenJioNewPost" component={OpenJioNewPost} />
    </OpenJioStack.Navigator>
  );
}

export default OpenJioStackGroup;
