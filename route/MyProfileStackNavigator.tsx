import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "./setdirectory";
import MyProfileScreen from "../screens/MyProfile/MyProfile";
import AddBioScreen from "../screens/MyProfile/AddBio";
import ChangeInfoScreen from "../screens/MyProfile/ChangingInfo";

const MyProfileStack = createNativeStackNavigator<RootStackParamList>();

function MyProfileStackGroup() {
    return (
        <MyProfileStack.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
        })}
        >
            <MyProfileStack.Screen name="MyProfile" component={MyProfileScreen}/>
            <MyProfileStack.Screen name="AddBio" component={AddBioScreen} />
            <MyProfileStack.Screen name="ChangeInfo" component={ChangeInfoScreen}/>
        </MyProfileStack.Navigator>
    )
}

export default MyProfileStackGroup;