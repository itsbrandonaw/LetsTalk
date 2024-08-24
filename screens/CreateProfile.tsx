import React, { useState } from "react";
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
  ActivityIndicator
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Hobby } from "../constants/Hobby";
import { Faculty } from "../constants/Faculty";
import { Colors } from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../route/setdirectory";
import AppTextInput from "../textinput/AppTextInput";
import { SelectList } from "react-native-dropdown-select-list";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { authentication } from "../firebaseconfig";
import HomeScreen from "@/app-example/(tabs)";
const { height } = Dimensions.get("screen");

type Props = NativeStackScreenProps<RootStackParamList, "CreateProfile">; //current directory of which page we in?

const CreateProfileScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    const [loading, setLoading] = useState(false);
    const [faculty, setFaculty] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [hobby, setHobby] = React.useState([]);

    return (
        <SafeAreaView>
            <View>
                <ImageBackground style ={{
                    height: height,
                }}
                source={require("../assets/images/signuppage.png")}>
                    <View>
                        <ScrollView>
                            <Text style={{
                                fontSize: FontSize.xxLarge,
                                color: Colors.white,
                                fontFamily: Font["inter-bold"],
                                textAlign: "left",
                                marginTop: Spacing * 9,
                                marginHorizontal: Spacing * 1.5,
                            }}>
                                Tell us more about you!</Text>
                            
                            <Text style={{
                                fontSize: FontSize.small,
                                color: Colors.white,
                                fontFamily: Font["poppins-regular"],
                                textAlign: "left",
                                marginTop: Spacing * 4,
                                marginHorizontal: Spacing * 2,
                            }}>
                                Your Faculty:</Text>
                            
                            <View style={{
                                paddingHorizontal: Spacing * 2,
                            }}>
                                <AppTextInput
                                placeholder="e.g. School of Computing"
                                value = {faculty}
                                onChangeText={(text) => setFaculty(text)}
                                >
                                </AppTextInput>
                            </View>

                            <Text style={{
                                fontSize: FontSize.small,
                                color: Colors.white,
                                fontFamily: Font["poppins-regular"],
                                textAlign: "left",
                                marginHorizontal: Spacing * 2,
                            }}>
                                Your Course:</Text>

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
                                color: Colors.white,
                                fontFamily: Font["poppins-regular"],
                                textAlign: "left",
                                marginHorizontal: Spacing * 2,
                            }}>
                                Year:</Text>

                            <View style={{
                                paddingLeft: Spacing * 2,
                                paddingRight: Spacing * 28,
                            }}>
                                <AppTextInput
                                placeholder="e.g. 1 - 5"
                                value = {year}
                                onChangeText={(text) => setYear(text)}
                                keyboardType="numeric"
                                >
                                </AppTextInput>
                            </View>

                            {/* kiv for multiple select list */}
                            {/* <View style={{
                                flex:1,
                                paddingHorizontal: Spacing * 2,
                            }}>
                                <MultipleSelectList
                                    setSelected={setHobby}
                                    data={Hobby}
                                    label="Types of hobbies"
                                    onSelect={() => console.log(hobby)}
                                    save="value"
                                >
                                </MultipleSelectList>
                            </View> */}

                            <View style = {{
                                paddingHorizontal: Spacing * 2,
                                paddingVertical: Spacing,
                            }}>

                                { loading ? (<ActivityIndicator
                                size="large"
                                color="#000ff">
                                </ActivityIndicator>) : (

                                //onPress will bring me to create profile page, whereby i will then include their details into database, then sign them in? (then how do i settle the database info)
                                <TouchableOpacity
                                onPress={() => navigate("Home") }
                                style = {{
                                backgroundColor: Colors.yellow,
                                paddingVertical: Spacing * 1.5,
                                paddingHorizontal: Spacing * 2,
                                borderRadius: Spacing,
                                shadowColor: Colors.yellow,
                                marginTop: Spacing * 10,
                                }}>
                                <Text style = {{
                                    fontSize: FontSize.medium,
                                    color: Colors.white,
                                    fontFamily: Font["inter-bold"],
                                    textAlign: "center",
                                }}>Next</Text>
                                </TouchableOpacity>

                                )}

                            </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

export default CreateProfileScreen;

const styles = StyleSheet.create({});