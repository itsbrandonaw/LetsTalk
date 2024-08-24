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
  Modal,
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
import ReportModal from "./ReportPage";
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
    serverTimestamp,
    getFirestore,
} from "firebase/firestore";
import { getAuth, signOut, updateCurrentUser } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userInfo } from "os";
import { Ionicons } from "@expo/vector-icons";
const { height } = Dimensions.get("screen");

interface ReportHeaderProps {
    onBackPress: () => void;
    onReportPress: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ onBackPress, onReportPress }) => {

    return (
        <View style={styles.headerContainer}
        >
            <TouchableOpacity
            onPress={onBackPress}
            >
                <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>

            <Text style={{
                marginLeft: 85,
                color: Colors.white,
                fontFamily: Font["poppins-semiBold"],
                fontSize: FontSize.large,
            }}>
                Reporting Page
            </Text>

            <TouchableOpacity
            onPress={onReportPress}
            >
                <Text style=
                {{  marginLeft: 60,
                    color: Colors.lightred,
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.small,
                    textDecorationLine: "underline"
                }}>
                    Report
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default ReportHeader;

const styles = StyleSheet.create({
    ChatBoxStyle: {
        paddingBottom: 220,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing * 1,
        paddingVertical: Spacing * 1.5,
        backgroundColor: Colors.yellow,
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    chatName: {
        marginLeft: Spacing,
        color: Colors.white,
        fontSize: FontSize.medium,
        fontFamily: Font["inter-semiBold"],
    },
    profileContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: Spacing,
    }
});