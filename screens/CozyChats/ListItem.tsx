import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { 
  Dimensions,
  ImageBackground, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Text, 
  View, 
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import { Hobby } from "../../constants/Hobby";
import { Faculty } from "../../constants/Faculty";
import { Colors } from "../../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/setdirectory";
import AppTextInput from "../../textinput/AppTextInput";
import { SelectList } from "react-native-dropdown-select-list";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { authentication, database } from "../../firebaseconfig";
import { Avatar, Bubble, GiftedChat, IMessage } from "react-native-gifted-chat";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
} from "firebase/firestore";
import { signOut, updateCurrentUser } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userInfo } from "os";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, GestureHandlerRootView, NativeViewGestureHandler } from "react-native-gesture-handler";
import ChatItem from "./ChatItem";
const { height } = Dimensions.get("screen");

export function ListItem({users}) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <GestureHandlerRootView style={{flex: 1}}>
            <View style={{
                flex: 1,
            }}>
                <FlatList
                data={users}
                contentContainerStyle={{flex:1, paddingVertical: 25}}
                keyExtractor={item => Math.random()}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => <ChatItem item={item} index={index} />}
                />
            </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        marginVertical: 0,
        backgroundColor: Colors.gray,
        alignItems: "center",
        marginHorizontal: 30,
        borderRadius: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
        marginVertical: 10,
    },
    ownerHolder: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15,
        justifyContent: "center",
    }
})
