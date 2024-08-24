import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontSize from "@/constants/FontSize";
import Font from "@/constants/Font";
import { Colors } from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const MainHeaderPost = ({ title }) => {
  const insets = useSafeAreaInsets();
  return (
    // <View style = {[styles.container, {marginTop: insets.top}]}>
    <View style={styles.container}>
      {/* <TouchableWithoutFeedback onPress={() => navigation.goback()}>
        <View>
          <Ionicons name="person-circle" size={32} color="black" />
        </View>
      </TouchableWithoutFeedback> */}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rectangle}>
        <Text> </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    align: "center",
    backgroundColor: Colors.lightyellow,
    paddingBottom: 28,
    paddingTop: 0,
  },
  title: {
    fontSize: FontSize.innerheader,
    color: Colors.text,
    fontFamily: Font["inter-bold"],
    textAlign: "center",
    marginTop: Spacing * 2,
    marginBottom: Spacing,
  },
  rectangle: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    height: 30,
  },
});

export default MainHeaderPost;
