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
import { Year } from "../../constants/Years";
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
    getDocs,
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

type Props = NativeStackScreenProps<RootStackParamList, "ChangeInfo">; //current directory of which page we in?

const ChangeInfoScreen: React.FC<Props> = ({ navigation: { navigate } }: RouterProps) => {
    const [faculty, setFaculty] = useState([]);
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [hobby, setHobby] = useState([]);
    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [facultyOptions, setFacultyOptions] = useState([]);

    useEffect(() => {
        const fetchFacultyOptions = async () => {
            try {
                const facultyCollection = collection(database, "faculty");
                const querySnapshot = await getDocs(facultyCollection);

                const options = querySnapshot.docs.map((doc) => ({
                    key: doc.id,
                    value: doc.data().name
                }));

                setFacultyOptions(options);
                console.log("Fetched options:", options);
            } catch (error) {
                console.error("Error fetching faculty options:", error);
            }
        };
        fetchFacultyOptions();
    }, []);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                fetchUserData(user.uid);
            } else {
                console.error("User not authenticated");
            }
        });
        return unsubscribe;
    }, []);

    const fetchUserData = async (userID: string) => {
        try {
            const userDocRef = doc(database, "users", userID);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setFaculty(userData.faculty || []);
                setCourse(userData.course || "");
                setYear(userData.year || "");
                setHobby(userData.hobby || []);
                setUsername(userData.username || "");
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        } finally {
            setIsLoading(false);
        }
    };

    {/* useEffect(() => {
        const fetchSignUpData = async () => {
            if (userID) {
                try {
                    const userDocRef = doc(database, "users", userID);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        if (userData.faculty) {
                            setFaculty(userData.faculty || []);
                        }
                        if (userData.course) {
                            setCourse(userData.course || "");
                        }
                        if (userData.year) {
                            setCourse(userData.year || "");
                        }
                        if (userData.hobby) {
                            setCourse(userData.hobby || []);
                        }
                        if (userData.username) {
                            setCourse(userData.username || "");
                        }
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching sign up data", error);
                }
            }
        };
        fetchSignUpData();
    }, [userID, database]); */}

    return (
        <SafeAreaView>
            <ScrollView style={{
                    //marginBottom: Spacing * 15,
            }}>
                {isLoading ? (
                <ActivityIndicator size="large" color={Colors.yellow} style={{marginTop: 350}} />
                ) : (
                <View style={{ flex: 1 }}>
                    <Image source={require("../../assets/images/InitialProfile.png")}
                        style={{
                            resizeMode:"contain",
                            marginTop: Spacing * 4,
                            height: 90,
                            width: "auto",
                        }}
                        />
                    
                    <View>
                        <Text style = {{
                            fontSize: FontSize.small,
                            fontFamily: Font["poppins-regular"],
                            color: Colors.text,
                            marginHorizontal: Spacing * 2,
                        }}>
                            Username:
                        </Text>

                    <View style={{
                        paddingHorizontal: Spacing * 2,
                    }}>
                        <AppTextInput
                        placeholder="Username"
                        secureTextEntry={false}
                        spellCheck={false}
                        value={username}
                        onChangeText={setUsername}
                        >
                        </AppTextInput>
                    </View>

                    <View style = {{
                        paddingHorizontal: Spacing * 2,
                        paddingVertical: Spacing * 2,
                    }}>
                        <Text style = {{
                            fontSize: FontSize.small,
                            fontFamily: Font["poppins-regular"],
                            color: Colors.text,
                            marginBottom: Spacing * 1.25,
                        }}>
                            Faculty:
                        </Text>

                        <MultipleSelectList
                            selected={faculty}
                            setSelected={setFaculty}
                            boxStyles={{backgroundColor:Colors.gray, borderColor: Colors.gray}}
                            dropdownStyles={{backgroundColor: Colors.gray, borderColor: Colors.gray}}
                            dropdownTextStyles={{color: Colors.darkText}}
                            labelStyles={{color: Colors.darkText}}
                            inputStyles={{color: Colors.darkText}}
                            checkBoxStyles={{borderColor: Colors.darkText}}
                            data={facultyOptions}
                            placeholder="Click to select"
                            label="Faculty"
                            save="value"
                        />
                    </View>

                    </View>
                        <Text style={{
                            fontSize: FontSize.small,
                            color: Colors.text,
                            fontFamily: Font["poppins-regular"],
                            textAlign: "left",
                            marginHorizontal: Spacing * 2,
                        }}>
                            Course:</Text>

                    <View style={{
                        paddingHorizontal: Spacing * 2,
                    }}>
                        <AppTextInput
                        placeholder="e.g. Computer Science"
                        value = {course}
                        onChangeText={(text) => setCourse(text)}
                        >
                        </AppTextInput>
                    </View>

                    <Text style={{
                        fontSize: FontSize.small,
                        color: Colors.text,
                        fontFamily: Font["poppins-regular"],
                        textAlign: "left",
                        marginHorizontal: Spacing * 2,
                        marginTop: Spacing,
                    }}>
                        Year:</Text>

                    <View style={{
                        paddingLeft: Spacing * 2,
                        paddingRight: Spacing * 30,
                        flex:1,
                        paddingHorizontal: Spacing * 2,
                        marginVertical: Spacing * 1.25, 
                    }}>
                        <SelectList
                        placeholder="Se..."
                        selected={year}
                        setSelected={setYear}
                        boxStyles={{backgroundColor:Colors.gray, borderColor: Colors.gray}}
                        dropdownStyles={{backgroundColor: Colors.gray, borderColor: Colors.gray}}
                        dropdownTextStyles={{color: Colors.darkText}}
                        inputStyles={{color: Colors.darkText}}
                        data={Year}
                        onSelect={() => console.log(year)}
                        save="value"
                        />
                    </View>

                    <Text style={{
                        fontSize: FontSize.small,
                        color: Colors.text,
                        fontFamily: Font["poppins-regular"],
                        textAlign: "left",
                        marginHorizontal: Spacing * 2,
                        marginTop: Spacing,
                    }}>
                        Hobbies:</Text>
                        
                    {/* kiv for multiple select list */}
                    <View style={{
                    flex:1,
                    paddingHorizontal: Spacing * 2,
                    marginVertical: Spacing * 1.25,
                    }}>
                        <MultipleSelectList
                        selected={hobby}
                        setSelected={setHobby}
                        boxStyles={{backgroundColor:Colors.gray, borderColor: Colors.gray}}
                        dropdownStyles={{backgroundColor: Colors.gray, borderColor: Colors.gray}}
                        dropdownTextStyles={{color: Colors.darkText}}
                        labelStyles={{color: Colors.darkText}}
                        inputStyles={{color: Colors.darkText}}
                        checkBoxStyles={{borderColor: Colors.darkText}}
                        data={Hobby}
                        placeholder="Click to select"
                        label="Types of hobbies"
                        onSelect={() => console.log(hobby)}
                        save="value"
                        />
                    </View>
                </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ChangeInfoScreen;

const styles = StyleSheet.create({
    rectangle: {
        width: 400,
        height: 2000,
        backgroundColor: Colors.white,
    },
    lowerrectangle: {
        width: 400,
        minHeight: 2000,
        marginBottom: Spacing * 15,
        backgroundColor: Colors.gray,
    }
});