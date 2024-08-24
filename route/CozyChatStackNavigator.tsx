import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "./setdirectory";
import CozyChatScreen from "../screens/CozyChats/CozyChat";
import ChatHome from "../screens/CozyChats/ChatHome";
import ChatHeader from "../screens/CozyChats/ChatHeader";
import { ListItem } from "../screens/CozyChats/ListItem";
import ReportPage from "../screens/CozyChats/ReportPage";

const CozyChatStack = createNativeStackNavigator<RootStackParamList>();

function CozyChatStackGroup() {
    return (
        <CozyChatStack.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
        })}
        >
            <CozyChatStack.Screen name="ChatHome" component={ChatHome} />
            <CozyChatStack.Screen name="CozyChat" component={CozyChatScreen} />
            <CozyChatStack.Screen name="ChatHeader" component={ChatHeader} />
            <CozyChatStack.Screen name="ListItem" component={ListItem} />
            <CozyChatStack.Screen name="ReportPage" component={ReportPage} />
        </CozyChatStack.Navigator>
    )
}

export default CozyChatStackGroup;