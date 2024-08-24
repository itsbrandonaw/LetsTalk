import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "./setdirectory";
import OpenLettersScreen from "@/screens/OpenLetters/OpenLettersScreen";
import OpenLetterPostScreen from "@/screens/OpenLetters/OpenLetterPostScreen";
import OpenLetterNewPost from "@/screens/OpenLetters/OpenLetterNewPost";

const OpenLetterStack = createNativeStackNavigator<RootStackParamList>();

function OpenLetterStackGroup() {
  return (
    <OpenLetterStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <OpenLetterStack.Screen
        name="OpenLetters"
        component={OpenLettersScreen}
      />
      <OpenLetterStack.Screen
        name="OpenLetterPost"
        component={OpenLetterPostScreen}
      />
      <OpenLetterStack.Screen
        name="OpenLetterNewPost"
        component={OpenLetterNewPost}
      />
    </OpenLetterStack.Navigator>
  );
}

export default OpenLetterStackGroup;
