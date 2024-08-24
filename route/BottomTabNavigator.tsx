import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import icons from "@/constants/icons";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import CustomTabBarButton from "@/components/CustomTabBarButton";
import { RootStackParamList } from "./setdirectory";
import OpenLetterStackGroup from "./OpenLetterStackNavigator";
import OpenJioStackGroup from "./OpenJioStackNavigator";
import MyProfileStackGroup from "./MyProfileStackNavigator";
import CozyChatStackGroup from "./CozyChatStackNavigator";

const Tab = createBottomTabNavigator<RootStackParamList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: style.tabBarStyle,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.lightyellow,
      })}
    >
      <Tab.Screen
        name="OpenLetterStackGroup"
        component={OpenLetterStackGroup}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SimpleLineIcons name="envelope-letter" size={28} color="grey" />
            ) : (
              <SimpleLineIcons name="envelope-letter" size={28} color="black" />
            ),

          //tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="OpenJioStackGroup"
        component={OpenJioStackGroup}
        options={{
          //tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="notification" size={30} color="grey" />
            ) : (
              <AntDesign name="notification" size={30} color="black" />
            ),
          //tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="CozyChatStackGroup"
        component={CozyChatStackGroup}
        options={{
          tabBarLabel: "Cozy Chats",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="message1" size={29} color="grey" />
            ) : (
              <AntDesign name="message1" size={29} color="black" />
            ),
          //tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="MyProfileStackGroup"
        component={MyProfileStackGroup}
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person-circle" size={32} color="grey" />
            ) : (
              <Ionicons name="person-circle" size={32} color="black" />
            ),
          //tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const style = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.lightyellow,
    borderTopWidth: 0,
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: Colors.transparent,
    height: 60,
  },
});
