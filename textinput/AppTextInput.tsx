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
  TextInputProps,
  KeyboardAvoidingView
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { Colors } from "../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../route/setdirectory";

const AppTextInput: React.FC<TextInputProps> = ({...otherProps}) => {
    const [focused, setFocused] = useState<boolean>(false)
  return (
    <KeyboardAvoidingView behavior="padding">
    <TextInput 
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
    placeholderTextColor={Colors.darkText}
    spellCheck={false}
    autoCapitalize="none"
    style = {[
    {
      fontSize: FontSize.xsmall,
      fontFamily: Font["inter-regular"],
      color: Colors.text,
      padding: Spacing * 1.5,
      marginVertical: Spacing,
      backgroundColor: Colors.gray,
      borderRadius: Spacing,
    },
    focused && {
        borderWidth: 2,
        borderColor: Colors.yellow,
    }
    ]}
    {...otherProps}
    >
    </TextInput>
    </KeyboardAvoidingView>
  )
}

export default AppTextInput

const styles = StyleSheet.create({})