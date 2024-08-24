import React, { useState, useEffect } from "react";
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
import { authentication, database } from "../../firebaseconfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import Navigation from "@/route/navigation";
const { height } = Dimensions.get("screen");

interface RouterProps {
    navigation: NavigationProp<any,any>;
  }

type Props = NativeStackScreenProps<RootStackParamList, "AddBio">; //current directory of which page we in?

const AddBioScreen: React.FC<Props> = ({ navigation: { navigate } }: RouterProps) => {
    const[bio, setBio] = useState("");
    const [userID, setUserID] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
            } else {
                console.error("User not authenticated");
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchBio = async () => {
            if (userID) {
                try {
                    const userDocRef = doc(database, "users", userID);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        if (userData.bio) {
                            setBio(userData.bio);
                        }
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching bio", error);
                }
            }
        };
        fetchBio();
    }, [userID, database]);

    const handleSaveBio = async () => {
        if (!userID || !isEditing) {
            return;
        }

        try {
            const userDocRef = doc(database, "users", userID);

            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                await setDoc(userDocRef, { bio }, { merge: true });
            } else {
                await setDoc(userDocRef, {users: bio})
            }
            
            console.log("Bio saved successfully!")
            setIsEditing(false);

            navigate("MyProfile");
        } catch (error) {
        console.error("Error saving bio", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.rectangle}>
                <View style={{
                    flexDirection: "row"
                }}>
                    <TouchableOpacity
                    onPress={() => navigate("MyProfile")}
                    >
                        <Text style={{
                            fontSize: FontSize.medium,
                            fontFamily: Font["inter-regular"],
                            marginTop: Spacing * 1.5,
                            textAlign: "left",
                            marginLeft: Spacing * 1.5,
                            color: Colors.text,
                        }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={() => handleSaveBio()}
                    >
                        <Text style={{
                            fontSize: FontSize.medium,
                            fontFamily: Font["inter-bold"],
                            textAlign: "right",
                            marginLeft: Spacing * 26.5,
                            marginTop: Spacing * 1.5,
                            color: Colors.text
                        }}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Image source={require("../../assets/images/InitialProfile.png")}
                    style={{
                        resizeMode:"contain",
                        marginTop: Spacing * 4,
                        height: 90,
                        width: "auto",
                    }}
                    />
                </View>

                <View style={{
                    paddingHorizontal: Spacing * 2,
                }}>
                    <TextInput 
                    placeholder="About"
                    value={bio}
                    multiline
                    onChangeText={(text) => setBio(text)}
                    //editable={isEditing}
                    onPress={() => setIsEditing(!isEditing)}
                    style={[
                        {
                        backgroundColor: Colors.white,
                        textAlign:"justify",
                        textAlignVertical:"top",
                        marginVertical: Spacing * 2,
                        borderWidth: 2,
                        minHeight: 40,
                        maxHeight: 120,
                        paddingVertical: Spacing * 2,
                    }, {
                        borderWidth: 2,
                        borderColor: Colors.yellow,
                    }
                    ]} />
                    {/* <TouchableOpacity
                    onPress={() => setIsEditing(!isEditing)}
                    >
                        <Text style={{
                            fontSize: FontSize.medium,
                            color: Colors.text,
                        }}>
                            {isEditing ? "Cancel" : "Edit"}
                        </Text>
                    </TouchableOpacity> */}
                </View>

            </View>
        </SafeAreaView>
    )
}

export default AddBioScreen;

const styles = StyleSheet.create({
    rectangle: {
        width: 400,
        height: 50,
        backgroundColor: Colors.lightyellow,
    }
});