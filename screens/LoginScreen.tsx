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
  ActivityIndicator
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Colors } from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../route/setdirectory";
import AppTextInput from "../textinput/AppTextInput";
import { authentication } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
const { height } = Dimensions.get("screen");

interface RouterProps {
  navigation: NavigationProp<any,any>;
}

type Props = NativeStackScreenProps<RootStackParamList, "Login">; //current directory of which page we in?

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }: RouterProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = authentication;
    
    const signIn = async () => {
      setLoading(true);
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
      } catch (error: any) {
        console.log(error);
        alert("Login error: " + error.message + ".")
      } finally {
        setLoading(false);
      }
    }

  return (
    <SafeAreaView>
      <View>
        <ImageBackground style={{
          height: height,
        }}
        source={require("../assets/images/loginpage.png")}>
          <View style={{
            //paddingHorizontal: Spacing * 4,
            //paddingTop: Spacing * 4,
          }}>
            <Text style={{
              fontSize: FontSize.xxLarge,
              color: Colors.white,
              fontFamily: Font["inter-semiBold"],
              textAlign: "left",
              marginLeft: Spacing * 4,
              marginTop: Spacing * 10,
            }}>Hello.</Text>
          
            <Text style = {{
              fontSize: FontSize.xxxLarge,
              color: Colors.white,
              fontFamily: Font["inter-bold"],
              textAlign: "left",
              marginLeft: Spacing * 4,
            }}>Let's Talk!</Text>

            <Text style = {{
              fontSize: FontSize.large,
              color: Colors.white,
              fontFamily: Font["inter-regular"],
              textAlign: "center",
              marginTop: Spacing * 4
            }}>Sign in here</Text>
          </View>

          <View style = {{
            paddingHorizontal: Spacing * 2,
            paddingVertical: Spacing * 4,
          }}>
            <AppTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            >
            </AppTextInput>

            <AppTextInput 
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            >
            </AppTextInput>

            <TouchableOpacity
            //onPress={() => navigate("Forgotpw")} --> to put in
            style = {{}}>
              <Text style = {{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                color: Colors.white,
                alignSelf: "flex-end",
                marginBottom: Spacing,
                textDecorationLine: "underline",
              }}>
                Forgot your password?</Text>
            </TouchableOpacity>

            { loading ? (<ActivityIndicator
            size="large"
            color="#000ff">
            </ActivityIndicator>) : (

            <TouchableOpacity
            onPress={() => signIn()}
            style = {{
              backgroundColor: Colors.yellow,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              borderRadius: Spacing,
              shadowColor: Colors.yellow,
              marginVertical: Spacing * 2,
            }}>
              <Text style = {{
                fontSize: FontSize.large,
                color: Colors.white,
                fontFamily: Font["inter-bold"],
                textAlign: "center",
              }}>Login</Text>
            </TouchableOpacity>
            
            )}

          </View>

          <View style = {{
            paddingLeft: Spacing * 7.5,
            flexDirection: "row",
            alignContent: "center"
          }}>
            <Text style = {{
              fontFamily: Font["poppins-regular"],
              fontSize: FontSize.small,
              color: Colors.white,
            }}>Don't have an account?</Text>

            <TouchableOpacity
            onPress={() => navigate("Signup")}
            style = {{}}>
              <Text style = {{
                fontFamily: Font["poppins-semiBold"],
                fontSize: FontSize.small,
                color: Colors.yellow,
                textDecorationLine: "underline",
                marginLeft: 3
              }}>
                Sign up</Text>
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({});