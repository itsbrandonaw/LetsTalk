import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
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
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ListItem } from "./ListItem";
import { userInfo } from "os";
import { ListIndexesCursor } from "mongodb";
const { height } = Dimensions.get("screen");

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type Props = NativeStackScreenProps<RootStackParamList, "ChatHome">; //current directory of which page we in?

const ChatHome: React.FC<Props> = ({
  navigation: { navigate },
}: RouterProps) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Query for chats where the current user is either user1id or user2id
        const q1 = query(
          collection(database, "cozychats"),
          where("user1Id", "==", currentUserId)
        );
        const q2 = query(
          collection(database, "cozychats"),
          where("user2Id", "==", currentUserId)
        );
        const querySnapshot1 = await getDocs(q1);
        const querySnapshot2 = await getDocs(q2);

        // Fetch details for each chat
        const chatDetails = await Promise.all(
          [...querySnapshot1.docs, ...querySnapshot2.docs].map(
            async (chatDoc) => {
              const chatData = chatDoc.data();

              const otherUserId =
                chatData.user1Id === currentUserId
                  ? chatData.user2Id
                  : chatData.user1Id;
              const otherUserDoc = await getDoc(
                doc(database, "users", otherUserId)
              );
              const otherUserName = otherUserDoc.exists()
                ? otherUserDoc.data().username
                : "Unknown User";

              return {
                id: chatDoc.id,
                lastMessage: chatData.lastMessage,
                otherUserName,
                timestamp: chatData.timestamp.toDate(),
              };
            }
          )
        );

        setChats(chatDetails);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: "space-between",
          alignContent: "center",
          paddingHorizontal: Spacing * 1.5,
          paddingVertical: Spacing * 3,
          backgroundColor: Colors.lightyellow,
          elevation: Spacing,
        }}
      >
        <Text
          style={{
            fontFamily: Font["inter-bold"],
            color: Colors.text,
            fontSize: FontSize.xLarge,
          }}
        >
          Chats
        </Text>

        <View
          style={{
            paddingVertical: 5,
            marginBottom: -Spacing * 2,
          }}
        >
          <AppTextInput
            placeholder="Search"
            style={[
              {
                backgroundColor: Colors.white,
                paddingVertical: 5,
                padding: Spacing * 1.5,
                borderRadius: Spacing,
              },
              // focused && {
              //   borderWidth: 2,
              //   borderColor: Colors.yellow,
              // },
            ]}
          ></AppTextInput>
        </View>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.lightyellow} />
        ) : (
          <FlatList
            data={chats}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.textrectangle}
                onPress={() =>
                  navigation.navigate("CozyChat", { chatId: item.id })
                }
              >
                <Image
                  source={require("../../assets/images/InitialProfile.png")}
                  style={styles.imageSize}
                />
                <Text
                  style={{
                    fontSize: FontSize.mLarge,
                    fontFamily: Font["inter-semiBold"],
                  }}
                >
                  {item.otherUserName}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      {/* {
                users.length > 0 ? (
                    <ListItem users={users} />
                ) : (
                    <View style={{
                        marginTop: 200,
                        alignItems: "center",
                        flex: 1,
                    }}
                    >
                        <ActivityIndicator size="large" />
                    </View>
                )
            } */}

      {/* <TouchableOpacity
        onPress={() => navigate("CozyChat")}
        style={styles.textrectangle}
      >
        <Image
          source={require("../../assets/images/InitialProfile.png")}
          style={styles.imageSize}
        />
        <Text
          style={{
            fontSize: FontSize.mLarge,
            fontFamily: Font["inter-semiBold"],
          }}
        >
          {chatName}
        </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  textrectangle: {
    flexDirection: "row",
    borderBottomColor: Colors.text,
    backgroundColor: Colors.gray,
    paddingVertical: Spacing,
  },
  imageSize: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
});
