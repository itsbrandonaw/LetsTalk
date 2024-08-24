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
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Colors } from "../constants/Colors";
import { Hobby } from "../constants/Hobby";
import { Year } from "../constants/Years";
import { Faculty } from "../constants/Faculty";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../route/setdirectory";
import AppTextInput from "../textinput/AppTextInput";
import { authentication, database } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import {
  doc,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
const { height } = Dimensions.get("screen");

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type Props = NativeStackScreenProps<RootStackParamList, "Signup">; //current directory of which page we in?

const SignupScreen: React.FC<Props> = ({
  navigation: { navigate },
}: RouterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = authentication;
  const [username, setUsername] = useState("");
  const [faculty, setFaculty] = useState([]);
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [hobby, setHobby] = useState([]);

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the ID of the newly created user
      const userID = response.user.uid;

      //Store the yser details in firestore
      const userDocRef = doc(database, "users", userID); // creating reference to user document
      await setDoc(userDocRef, {
        username: username,
        faculty: faculty,
        course: course,
        year: year,
        hobby: hobby,
        email: email, // adding email for reference if needed
      });

      console.log(response);
      alert("Check your email for confirmation!");
    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message + ".");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height,
          }}
          source={require("../assets/images/signuppage.png")}
        >
          <ScrollView
            style={{
              flex: 1,
              marginBottom: Spacing * 15,
            }}
          >
            <View
              style={
                {
                  //paddingHorizontal: Spacing * 4,
                  //paddingTop: Spacing * 4,
                }
              }
            >
              <Text
                style={{
                  fontSize: FontSize.xLarge,
                  color: Colors.white,
                  fontFamily: Font["inter-bold"],
                  textAlign: "center",
                  marginTop: Spacing * 10,
                }}
              >
                Create an account with your email
              </Text>

              <Text
                style={{
                  fontSize: FontSize.large,
                  color: Colors.white,
                  fontFamily: Font["inter-semiBold"],
                  textAlign: "center",
                  marginTop: Spacing * 2,
                }}
              >
                Tell us more about you.
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: Spacing * 2,
                paddingVertical: Spacing * 4,
              }}
            >
              <Text
                style={{
                  fontSize: FontSize.small,
                  fontFamily: Font["poppins-regular"],
                  color: Colors.white,
                }}
              >
                Your email:
              </Text>

              <AppTextInput
                placeholder="example@gmail.com"
                spellCheck={false}
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></AppTextInput>

              <Text
                style={{
                  fontSize: FontSize.small,
                  fontFamily: Font["poppins-regular"],
                  color: Colors.white,
                  marginTop: Spacing,
                }}
              >
                Your password:
              </Text>

              <AppTextInput
                placeholder="Input password here"
                secureTextEntry={false}
                spellCheck={false}
                value={password}
                onChangeText={(text) => setPassword(text)}
              ></AppTextInput>
            </View>

            <View>
              <Text
                style={{
                  fontSize: FontSize.small,
                  fontFamily: Font["poppins-regular"],
                  color: Colors.white,
                  marginTop: -Spacing * 3,
                  marginHorizontal: Spacing * 2,
                }}
              >
                Create username:
              </Text>

              <View
                style={{
                  paddingHorizontal: Spacing * 2,
                }}
              >
                <AppTextInput
                  placeholder="Username"
                  secureTextEntry={false}
                  spellCheck={false}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                ></AppTextInput>
              </View>

              <Text
                style={{
                  fontSize: 9.5,
                  fontFamily: Font["poppins-regular"],
                  color: Colors.white,
                  marginTop: -Spacing * 0.5,
                  marginHorizontal: Spacing * 2,
                }}
              >
                Do take note that usernames cannot be changed once created.
              </Text>

              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.white,
                  fontFamily: Font["poppins-regular"],
                  textAlign: "left",
                  marginHorizontal: Spacing * 2,
                  marginTop: Spacing,
                }}
              >
                Your Faculty:
              </Text>

              <View
                style={{
                  paddingHorizontal: Spacing * 2,
                }}
              ></View>

              <View
                style={{
                  flex: 1,
                  paddingHorizontal: Spacing * 2,
                  marginTop: Spacing * 1.25,
                }}
              >
                <MultipleSelectList
                  setSelected={setFaculty}
                  boxStyles={{
                    backgroundColor: Colors.gray,
                    borderColor: Colors.gray,
                  }}
                  dropdownStyles={{
                    backgroundColor: Colors.gray,
                    borderColor: Colors.gray,
                  }}
                  dropdownTextStyles={{ color: Colors.darkText }}
                  labelStyles={{ color: Colors.darkText }}
                  inputStyles={{ color: Colors.darkText }}
                  checkBoxStyles={{ borderColor: Colors.darkText }}
                  data={Faculty}
                  placeholder="Click to select"
                  label="Faculty"
                  onSelect={() => console.log(faculty)}
                  save="value"
                />
              </View>
              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.white,
                  fontFamily: Font["poppins-regular"],
                  textAlign: "left",
                  marginHorizontal: Spacing * 2,
                  marginTop: Spacing,
                }}
              >
                Your Course:
              </Text>

              <View
                style={{
                  paddingHorizontal: Spacing * 2,
                }}
              >
                <AppTextInput
                  placeholder="e.g. Computer Science"
                  value={course}
                  onChangeText={(text) => setCourse(text)}
                ></AppTextInput>
              </View>

              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.white,
                  fontFamily: Font["poppins-regular"],
                  textAlign: "left",
                  marginHorizontal: Spacing * 2,
                  marginTop: Spacing,
                }}
              >
                Year:
              </Text>

              <View
                style={{
                  paddingLeft: Spacing * 2,
                  paddingRight: Spacing * 30,
                  flex: 1,
                  paddingHorizontal: Spacing * 2,
                  marginVertical: Spacing * 1.25,
                }}
              >
                <SelectList
                  setSelected={setYear}
                  boxStyles={{
                    backgroundColor: Colors.gray,
                    borderColor: Colors.gray,
                  }}
                  dropdownStyles={{
                    backgroundColor: Colors.gray,
                    borderColor: Colors.gray,
                  }}
                  dropdownTextStyles={{ color: Colors.darkText }}
                  inputStyles={{ color: Colors.darkText }}
                  data={Year}
                  placeholder="Se..."
                  onSelect={() => console.log(year)}
                  save="value"
                />
              </View>

              <Text
                style={{
                  fontSize: FontSize.small,
                  color: Colors.white,
                  fontFamily: Font["poppins-regular"],
                  textAlign: "left",
                  marginHorizontal: Spacing * 2,
                  marginTop: Spacing,
                }}
              >
                Hobbies:
              </Text>

              {/* kiv for multiple select list */}
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: Spacing * 2,
                  marginVertical: Spacing * 1.25,
                }}
              >
                <MultipleSelectList
                  setSelected={setHobby}
                  boxStyles={{
                    backgroundColor: Colors.gray,
                    borderColor: Colors.gray,
                  }}
                  dropdownStyles={{
                    backgroundColor: Colors.gray,
                    borderColor: Colors.gray,
                  }}
                  dropdownTextStyles={{ color: Colors.darkText }}
                  labelStyles={{ color: Colors.darkText }}
                  inputStyles={{ color: Colors.darkText }}
                  checkBoxStyles={{ borderColor: Colors.darkText }}
                  data={Hobby}
                  placeholder="Click to select"
                  label="Types of hobbies"
                  onSelect={() => console.log(hobby)}
                  save="value"
                />
              </View>
            </View>

            <View
              style={{
                marginTop: Spacing * 2,
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: Colors.white,
                  marginVertical: Spacing,
                  marginLeft: Spacing,
                }}
              >
                I agree to the{" "}
              </Text>

              <TouchableOpacity style={{}}>
                <Text
                  style={{
                    fontFamily: Font["poppins-regular"],
                    fontSize: FontSize.small,
                    color: Colors.yellow,
                    marginVertical: Spacing,
                    textDecorationLine: "underline",
                  }}
                >
                  Terms & Conditions{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: -Spacing * 2,
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: Colors.white,
                  marginVertical: Spacing,
                }}
              >
                and{" "}
              </Text>

              <TouchableOpacity
                //onPress={() => navigate("Forgotpw")} --> to put in
                style={{}}
              >
                <Text
                  style={{
                    fontFamily: Font["poppins-regular"],
                    fontSize: FontSize.small,
                    color: Colors.yellow,
                    marginVertical: Spacing,
                    textDecorationLine: "underline",
                  }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: Spacing * 2,
                paddingVertical: Spacing,
              }}
            >
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#000ff"
                ></ActivityIndicator>
              ) : (
                //onPress will bring me to create profile page, whereby i will then include their details into database, then sign them in? (then how do i settle the database info)
                <TouchableOpacity
                  onPress={() => signUp()}
                  style={{
                    backgroundColor: Colors.yellow,
                    paddingVertical: Spacing * 1.5,
                    paddingHorizontal: Spacing * 2,
                    borderRadius: Spacing,
                    shadowColor: Colors.yellow,
                    marginBottom: Spacing * 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSize.medium,
                      color: Colors.white,
                      fontFamily: Font["inter-bold"],
                      textAlign: "center",
                    }}
                  >
                    Sign up with email
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{
                paddingLeft: Spacing * 9,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: Colors.white,
                  textAlign: "left",
                  marginLeft: Spacing * 2,
                }}
              >
                Have an account?
              </Text>

              <TouchableOpacity onPress={() => navigate("Login")} style={{}}>
                <Text
                  style={{
                    fontFamily: Font["poppins-semiBold"],
                    fontSize: FontSize.small,
                    color: Colors.yellow,
                    textDecorationLine: "underline",
                    marginLeft: 3,
                  }}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
