import { Colors } from "@/constants/Colors";
import React, { Children } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CustomTabBarButton = (props) => {
  const { children, accessibilityState, onPress } = props;
  console.log("file: ctbb.tsx -line 5 - ctbb -props", props);

  if (accessibilityState.selected) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={styles.activeBtn}
        >
          <Text>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={styles.inactiveBtn}
        >
          <Text>{children}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: "center",
  },
  activeBtn: {
    flex: 1,
    backgroundColor: Colors.yellow,
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
