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
    doc,
    collection,
    getDoc,
    getDocs,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    setDoc,
    getFirestore,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut, updateCurrentUser } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userInfo } from "os";
import { Ionicons } from "@expo/vector-icons";
import ChatHeader from "./ChatHeader";
const { height } = Dimensions.get("screen");

export default function ChatItem({item}) {
    return (
        <SafeAreaView>
            <TouchableOpacity>
                <Image source={require("../../assets/images/InitialProfile.png")} />
                
            </TouchableOpacity>
        </SafeAreaView>
    )
}