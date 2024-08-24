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

interface ChatHeaderProps {
    chatName: string;
    onBackPress: () => void;
    profileImage?: any;
    onReportPress: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatName, onBackPress, profileImage, onReportPress }) => {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    {/* const handleSubmit = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const reportData = {
                reportUserId: user.uid,
                reporterEmail: user.email,
                reportedUsername: user.displayName,
                category,
                description,
                timestamp: serverTimestamp(),
                status: "Pending",
            };

            try {
                await addDoc(collection(getFirestore(), "reports"), reportData);
                console.log("Report submitted successfully!");
                alert("Report submitted successfully!")
            } catch (error) {
                console.error("Error submitting report:", error);
            }
        } else {
            console.error("User not found!");
        }
    }; */}

    return (
        <View style={styles.headerContainer}
        >
            <TouchableOpacity
            onPress={onBackPress}
            >
                <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                {/* <Image source={require("../assets/images/InitialProfile.png")}
                style={{
                    height: 40,
                    width: 40,
                    marginLeft: Spacing,
                }}
            /> */}
                {profileImage ? (
                    <Image source={profileImage} style={styles.profileImage} />
                ) : (
                    <Avatar rounded icon={{ name: "user", type: "font-awesome" }} />
                )}
                <Text style={styles.chatName}>
                    {chatName}
                </Text>

                <TouchableOpacity
                onPress={onReportPress}
                style={{marginLeft: 175, }}
                >
                    <Image source={require("../../assets/images/ReportButtonIcon.png")}
                    style={{height: 37.5, width: 37.5,}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatHeader;

const styles = StyleSheet.create({
    ChatBoxStyle: {
        paddingBottom: 220,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing * 2,
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