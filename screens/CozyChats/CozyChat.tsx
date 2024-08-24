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
import ReportPage from "./ReportPage";
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
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateCurrentUser,
} from "firebase/auth";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { userInfo } from "os";
import { Ionicons } from "@expo/vector-icons";
import ChatHeader from "./ChatHeader";
const { height } = Dimensions.get("screen");

type Props = NativeStackScreenProps<RootStackParamList, "CozyChat">; //current directory of which page we in?

const CozyChatScreen: React.FC<Props> = ({
  navigation: { navigate },
}: RouterProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const navigation = useNavigation();
  const [chatName, setChatName] = useState("Loading...");
  const [userID, setUserID] = useState(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const database = getFirestore();
  const { params } = useRoute();
  const { chatId } = params;

  const handleBackPress = () => {
    navigate("ChatHome");
  };

  const handlePress = () => {
    navigate("ReportPage");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: Spacing * 2,
          }}
          onPress={() => navigate("ChatHome")}
        >
          <Text
            style={{
              fontSize: FontSize.medium,
              fontFamily: Font["inter-regular"],
              color: Colors.yellow,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  useLayoutEffect(() => {
    const collectionRef = collection(database, "cozychats", chatId, "Messages");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("snapshot");
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "cozychats", chatId, "Messages"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        fetchUserName(user.uid);
      } else {
        console.error("User not authenticated");
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserName = async (userID) => {
    try {
      const userDocRef = doc(database, "users", userID);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setChatName(userData.username || "Unknown User");
      } else {
        setChatName("Unknown User");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      setChatName("Error fetching name");
    }
  };

  interface ChatHeaderProps {
    chatName: string;
    onBackPress: () => void;
    profileImage?: any;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatHeader
        chatName={chatName}
        onBackPress={handleBackPress}
        profileImage={require("../../assets/images/InitialProfile.png")}
        onReportPress={handlePress}
      />

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: getAuth().currentUser?.uid,
          avatar: require("../../assets/images/InitialProfile.png"),
        }}
        messagesContainerStyle={{
          backgroundColor: Colors.white,
        }}
        bottomOffset={400}
        forceGetKeyboardHeight={true} //check how to solve the keyboard issue
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: Colors.yellow,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 15,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                marginBottom: Spacing,
                alignContent: "center",
              },
              left: {
                backgroundColor: Colors.gray,
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                marginBottom: Spacing,
                alignContent: "center",
              },
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default CozyChatScreen;

const styles = StyleSheet.create({
  ChatBoxStyle: {
    paddingBottom: 220,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing * 2,
    paddingVertical: Spacing * 1.5,
    backgroundColor: Colors.lightyellow,
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
  },
});
