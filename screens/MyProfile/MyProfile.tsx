import React, { useEffect, useState } from "react";
import { 
  Dimensions,
  ImageBackground, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  TextInput,
  Text, 
  Image,
  View, 
  ScrollView,
  ActivityIndicator
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
import { authentication } from "../../firebaseconfig";
import { NavigationProp } from "@react-navigation/native";
import {
    doc,
    collection,
    getDoc,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    setDoc,
    getFirestore,
  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const { height } = Dimensions.get("screen");

interface RouterProps {
    navigation: NavigationProp<any,any>;
  }

type Props = NativeStackScreenProps<RootStackParamList, "MyProfile">; //current directory of which page we in?

const MyProfileScreen: React.FC<Props> = ({ navigation: { navigate } }: RouterProps) => {
    const [username, setUsername] = useState("Loading...");
    const [userID, setUserID] = useState(null);
    const database = getFirestore();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user.uid);
            } else {
                setUsername("Not logged in");
            }
        });
        return unsubscribe;
    }, []);

    const fetchUserData = async (userID) => {
        try {
            const userDocRef = doc(database, "users", userID);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUsername(userData.username);
            } else {
                setUsername("User not found");
            }
        } catch (error) {
            console.error("Error fetching username: ", error);
            setUsername("Error fetching username");
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.rectangle}>
                <TouchableOpacity
                onPress={() => navigate("AddBio")}
                >
                    <Text style={{
                        fontSize: FontSize.medium,
                        fontFamily: Font["inter-regular"],
                        textAlign: "right",
                        marginRight: Spacing * 2.5,
                        marginTop: Spacing * 1.5,
                        color: Colors.text
                    }}>
                        Edit
                    </Text>
                </TouchableOpacity>

                <View>
                    <Image source={require("../../assets/images/InitialProfile.png")}
                    style={{
                        resizeMode:"contain",
                        height: 90,
                        width: "auto",
                    }}
                    />
                </View>

                {/* <Text style={{
                    fontSize: FontSize.xLarge,
                    fontFamily: Font["inter-semiBold"],
                    textAlign: "center",
                    marginTop: Spacing * 0.5,
                }}>
                    name
                </Text> */}

                <Text style={{
                    fontSize: FontSize.large,
                    fontFamily: Font["inter-regular"],
                    textAlign: "center",
                    marginTop: Spacing,
                    color: Colors.darkText,
                }}>
                    @{username}
                </Text>

                <View style={{
                    paddingHorizontal: Spacing * 2,
                    paddingVertical: Spacing * 4,
                }}>
                    <TouchableOpacity
                    style={{
                        backgroundColor: Colors.lightyellow,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing * 2,
                        borderRadius: Spacing,
                        shadowColor: Colors.yellow,
                        marginBottom: Spacing * 2,
                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Image source={require("../../assets/images/ChangeProfilePhoto.png")}
                            style ={{
                                resizeMode: "contain",
                                height: 20,
                                width: 20
                            }}
                            />
                            <Text style={{
                                marginLeft: Spacing,
                                fontSize: FontSize.small,
                            }}>
                                Change Profile Photo
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => navigate("ChangeInfo")}
                    style={{
                        backgroundColor: Colors.lightyellow,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing * 2,
                        borderRadius: Spacing,
                        shadowColor: Colors.yellow,
                        marginTop: Spacing * 2,
                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Image source={require("../../assets/images/InitialProfile.png")}
                            style ={{
                                resizeMode: "contain",
                                height: 20,
                                width: 20
                            }}
                            />
                            <Text style={{
                                marginLeft: Spacing,
                                fontSize: FontSize.small,
                            }}>
                                My Profile
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{
                        backgroundColor: Colors.lightyellow,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing * 2,
                        borderRadius: Spacing,
                        shadowColor: Colors.yellow,
                        marginTop: Spacing * 2,
                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Image source={require("../../assets/images/Account.png")}
                            style ={{
                                resizeMode: "contain",
                                height: 20,
                                width: 20
                            }}
                            />
                            <Text style={{
                                marginLeft: Spacing,
                                fontSize: FontSize.small,
                            }}>
                                Account
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{
                        backgroundColor: Colors.lightyellow,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing * 2,
                        borderRadius: Spacing,
                        shadowColor: Colors.yellow,
                        marginTop: Spacing * 2,
                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Image source={require("../../assets/images/Privacy.png")}
                            style ={{
                                resizeMode: "contain",
                                height: 20,
                                width: 20
                            }}
                            />
                            <Text style={{
                                marginLeft: Spacing,
                                fontSize: FontSize.small,
                            }}>
                                Privacy
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{
                        backgroundColor: Colors.lightyellow,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing * 2,
                        borderRadius: Spacing,
                        shadowColor: Colors.yellow,
                        marginTop: Spacing * 2,
                    }}>
                        <View style={{
                            flexDirection: "row",
                        }}>
                            <Image source={require("../../assets/images/Chat.png")}
                            style ={{
                                resizeMode: "contain",
                                height: 20,
                                width: 20
                            }}
                            />
                            <Text style={{
                                marginLeft: Spacing,
                                fontSize: FontSize.small,
                            }}>
                                Chats
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => authentication.signOut()}
                    style={{
                        backgroundColor: Colors.lightred,
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        borderRadius: Spacing,
                        shadowColor: Colors.yellow,
                        marginTop: Spacing * 5,
                    }}>
                        <View>
                            <Text style={{
                                fontFamily: Font["poppins-semiBold"],
                                fontSize: FontSize.small,
                                color: Colors.white,
                                textAlign: "center"
                            }}>
                                Log Out
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MyProfileScreen;

const styles = StyleSheet.create({
    rectangle: {
        width: 400,
        height: 170,
        backgroundColor: Colors.lightyellow,
    }
});