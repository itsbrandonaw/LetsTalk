import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/route/setdirectory";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import OpenLettersData from "@/components/data/OpenLetterData";
import MainHeaderPost from "@/components/MainHeaderPost";
import { Colors } from "@/constants/Colors";
import Font from "@/constants/Font";
import Spacing from "@/constants/Spacing";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableOpacity,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { database } from "@/firebaseconfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

type Props = NativeStackScreenProps<RootStackParamList, "OpenLetterNewPost">; //current directory

const OpenLetterPost: React.FC<Props> = ({ navigation: { navigate } }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [Username, SetUsername] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userDoc = await getDoc(doc(database, "users", user.uid));
        if (userDoc.exists()) {
          const fetchUsername = userDoc.data().username;
          SetUsername(fetchUsername);
        } else {
          console.error("No such user!");
        }
      }
    };

    fetchUsername();
  }, [user]);

  const uploadPost = async () => {
    try {
      await addDoc(collection(database, "openLetterPosts"), {
        title,
        body,
        timestamp: serverTimestamp(),
        Username,
        creatorId: user.uid,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign name="left" size={24} color={Colors.text}></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity onPress={uploadPost}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.text,
                fontFamily: Font["inter-bold"],
              }}
            >
              Post
            </Text>
          </TouchableOpacity>

          <View style={styles.rectangle}></View>
        </View>
        <View>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={2}
            style={styles.title}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          ></TextInput>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={2}
            style={styles.body}
            placeholder="Jio someone out today!"
            value={body}
            onChangeText={setBody}
          ></TextInput>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default OpenLetterPost;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
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
    backgroundColor: Colors.lightyellow,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 18,
    height: 86,
    paddingTop: 20,
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
});
