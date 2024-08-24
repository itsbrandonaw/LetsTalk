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
import ReportHeader from "./ReportHeader";
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

interface RouterProps {
    navigation: NavigationProp<any,any>;
  }

type Props = NativeStackScreenProps<RootStackParamList, "ReportPage">; //current directory of which page we in?

const ReportPage: React.FC<Props> = ({ navigation: { navigate } }: RouterProps) => {
    const [reason, setReason] = useState("");

    const handleBackPress = () => {
        navigate("CozyChat");
    };

    const handleReport = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const reportData = {
                reporterUserId: user.uid,
                //reportedUserId: route.params.user._id,
                reporterEmail: user.email,
                category: "Chat",
                description: reason,
                timestamp: serverTimestamp(),
                status: "Pending",
            };

            try {
                await addDoc(collection(database, "reports"), reportData);
                console.log("Report submitted successfully!");
                alert("Report submitted successfully!");
                navigate("ChatHome");
            } catch (error) {
                console.error("Error submitting report: ", error);
            }
        } else {
            console.error("Not logged in!");
        }
    };

    return (
        <SafeAreaView>
            <ReportHeader onBackPress={handleBackPress} onReportPress={handleReport}/>

            <ScrollView style={{
            marginBottom: Spacing * 6,
            }}>
                <View>
                    <Text style={{
                        textAlign: "center",
                        fontFamily: Font["inter-bold"],
                        color: Colors.yellow,
                        fontSize: FontSize.xxLarge,
                        marginVertical: 20,
                    }}>
                        We are sorry for this.
                    </Text>

                    <Text style={{
                        textAlign: "center",
                        fontFamily: Font["inter-bold"],
                        color: Colors.yellow,
                        fontSize: FontSize.large,
                    }}>
                        Do let us know why.
                    </Text>
                </View>
                <View style={styles.content}>
                    <AppTextInput
                        placeholder="Reason for reporting"
                        multiline
                        value={reason}
                        onChangeText={setReason}
                    />
                </View>

             </ScrollView>
        </SafeAreaView>
    );
};

export default ReportPage;

const styles = StyleSheet.create({
    content: {
        marginVertical: 20,
        paddingHorizontal: Spacing * 2,
    },
})