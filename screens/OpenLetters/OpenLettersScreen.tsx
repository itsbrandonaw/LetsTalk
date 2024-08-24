// Step 1: Fetch the API, check the data in the console --done!
// Step 2: Use the data to update the state and use masonry list
// Step 3: handle the errors and error state.
// Step 4: Adding a loading indicator for a better user experience

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Font from "@/constants/Font";
import FontSize from "@/constants/FontSize";
import Spacing from "@/constants/Spacing";
import { Colors } from "@/constants/Colors";
import { FlatList } from "react-native";
import MainHeader from "@/components/MainHeader";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/route/setdirectory";
import { useNavigation } from "@react-navigation/native";
import OpenLetterPostScreen from "./OpenLetterPostScreen";
import OpenLettersData from "@/components/data/OpenLetterData";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { database } from "@/firebaseconfig";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "OpenLetters">;

const OpenLettersScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [post, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const now = Timestamp.now();
    const oneDayAgo = Timestamp.fromMillis(
      now.toMillis() - 24 * 60 * 60 * 1000
    );

    const q = query(
      collection(database, "openLetterPosts"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView>
      <View>
        <MainHeader title={"Open Letters"} />
        <View style={styles.createButton}>
          <TouchableOpacity
            style={{ top: 10 }}
            onPress={() => {
              navigation.navigate("OpenLetterNewPost");
            }}
          >
            <EvilIcons name="pencil" size={60} color={Colors.text}></EvilIcons>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 175, zIndex: 1 }}>
          <FlatList
            data={post}
            numColumns={2}
            contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
            columnWrapperStyle={{ gap: 10, paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => {
                    navigation.navigate("OpenLetterPost", {
                      post: item,
                    });
                  }}
                >
                  <View style={styles.user}>
                    <Ionicons name="person-circle" size={20} color="black" />
                    <Text style={styles.username}> {item.Username} </Text>
                  </View>

                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.title}
                  >
                    {" "}
                    {item.title}{" "}
                  </Text>
                  <Text
                    numberOfLines={5}
                    ellipsizeMode="tail"
                    style={styles.body}
                  >
                    {" "}
                    {item.body}{" "}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default OpenLettersScreen;

const styles = StyleSheet.create({
  masonry: {
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 15,
    color: Colors.darkText,
    fontFamily: Font["poppins-semiBold"],
    textAlign: "left",
    textAlignVertical: "center",
    margin: Spacing,
  },
  body: {
    fontSize: 11,
    color: Colors.darkText,
    fontFamily: Font["inter-medium"],
    textAlign: "left",
    textAlignVertical: "center",
    margin: Spacing,
    paddingBottom: 10,
    lineHeight: 17.5,
  },
  container: {
    backgroundColor: Colors.lightPrimary,
    alignItems: "flex-start",
    justifyContent: "top",
    flexDirection: "column",
    display: "flex",
    flex: 1,
    borderRadius: 15,
    width: 165,
    height: 200,
    marginLeft: 10,
  },
  createButton: {
    position: "absolute",
    zIndex: 5,
    right: 50,
    top: 550,
    backgroundColor: Colors.lightyellow,
    borderRadius: 100,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowColor: Colors.text,
    elevation: 10,
    height: 80,
    width: 80,
    alignItems: "center",
    zIndex: 5,
  },
  user: {
    textAlign: "left",
    textAlignVertical: "center",
    paddingBottom: 2,
    marginTop: Spacing,
    marginHorizontal: Spacing,
    flexDirection: "row",
  },
  username: {
    fontSize: 13,
    color: Colors.darkText,
    fontFamily: Font["poppins-regular"],
    textAlign: "left",
    textAlignVertical: "center",
  },
});
