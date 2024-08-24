import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/route/setdirectory";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import OpenLettersData from "@/components/data/OpenLetterData";
import MainHeaderPost from "@/components/MainHeaderPost";
import { Colors } from "@/constants/Colors";
import Font from "@/constants/Font";
import Spacing from "@/constants/Spacing";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FontSize from "@/constants/FontSize";
import AppTextInput from "@/textinput/AppTextInput";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getOrCreateChat } from "../CozyChats/ChatHelper";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp, query } from "firebase/firestore";
import { database } from "@/firebaseconfig";
import { ScrollView } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "OpenLetterPost">;

const OpenLetterPostScreen: React.FC<Props> = ({
  navigation: { navigate },
}) => {
  const route = useRoute();
  const { post } = route.params;
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  const formattedTimestamp = post.timestamp
    ? new Date(post.timestamp.seconds * 1000).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const goBack = () => {
    navigation.goBack();
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const chatId = await getOrCreateChat(user.uid, post.creatorId);
      const messageData = {
        _id: new Date().getTime().toString(),
        text,
        createdAt: new Date(),
        user: {
          _id: user.uid,
          avatar: require("../../assets/images/InitialProfile.png"),
        },
      };

      await addDoc(
        collection(database, "cozychats", chatId, "Messages"),
        messageData
      );
      setText("");
      navigation.navigate("CozyChat", { chatId });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <AntDesign name="left" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Open Letter</Text>
          <View style={styles.rectangle}></View>
        </View>
        <KeyboardAvoidingView style={{ paddingBottom: 233 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.user}>
                <Ionicons name="person-circle" size={24} color="black" />
                <Text style={styles.username}> {post.Username} </Text>
                {formattedTimestamp && (
                  <Text style={styles.timestamp}>{formattedTimestamp}</Text>
                )}
              </View>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.body}>{post.body}</Text>
            </ScrollView>
          </TouchableWithoutFeedback>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Type your message..."
            />
            <TouchableOpacity onPress={sendMessage}>
              <Text style={styles.sendButton}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default OpenLetterPostScreen;

const styles = StyleSheet.create({
  user: {
    textAlign: "left",
    textAlignVertical: "center",
    paddingBottom: Spacing,
    marginHorizontal: Spacing * 2,
    flexDirection: "row",
    alignContent: "flex-end",
    flex: 1,
  },
  username: {
    fontSize: 15,
    color: Colors.darkText,
    fontFamily: Font["poppins-regular"],
    textAlign: "left",
    textAlignVertical: "center",
  },
  title: {
    fontSize: 18,
    color: Colors.darkText,
    fontFamily: Font["poppins-semiBold"],
    textAlign: "left",
    textAlignVertical: "center",
    marginLeft: Spacing * 2,
    marginRight: Spacing * 2,
  },
  body: {
    fontSize: 17,
    color: Colors.darkText,
    fontFamily: Font["inter-medium"],
    textAlign: "left",
    textAlignVertical: "center",
    margin: Spacing * 2,
    paddingBottom: 10,
    lineHeight: 27,
  },
  container: {
    textAlignVertical: "center",
    backgroundColor: Colors.lightyellow,
    paddingBottom: 28,
    paddingTop: 0,
    verticalAlign: "middle",
  },
  rectangle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    height: 30,
  },
  headerTitle: {
    fontSize: FontSize.innerheader,
    color: Colors.text,
    fontFamily: Font["inter-bold"],
    textAlign: "center",
    marginTop: Spacing * 2,
    marginBottom: Spacing,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 25,
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.white,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.yellow,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    fontFamily: Font["inter-medium"],
  },
  sendButton: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    paddingLeft: 120,
  },
});
