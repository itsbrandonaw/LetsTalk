/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
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
  Image,
  ActivityIndicator
} from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import CreateProfileScreen from "../screens/CreateProfile";
import OpenLetterStackGroup from "./OpenLetterStackNavigator";
import OpenJioStackGroup from "./OpenJioStackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { User, onAuthStateChanged } from "firebase/auth";

import { RootStackParamList } from "../route/setdirectory";
import { authentication } from "../firebaseconfig";
import { Ionicons } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useNavigation } from "expo-router";
import BottomTabNavigator from "./BottomTabNavigator";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      //console.log('user', user); --> dont need this?
      setUser(user);
    });
  }, []);

  // if else condition to check if user can gain access to insiderootnavigator thru authorisation
  return (
    <NavigationContainer 
    independent={true}
    theme={theme}>
      {user ?
      // another nested if(?) else(:) here between InsideRootTabNavigator and InsideRootNavigator
      //<InsideRootTabNavigator />
      <BottomTabNavigator />
      :
      <RootNavigator />
      }
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const InsideStack = createNativeStackNavigator<RootStackParamList>(); 

const Tab = createBottomTabNavigator<RootStackParamList>();

function InsideRootNavigator() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="ChatHome" component={ChatHome} />
      <InsideStack.Screen name="CreateProfile" component={CreateProfileScreen} />
    </InsideStack.Navigator>
  )
}

// username: baw@gmail.com/freddie@gmail.com password:test123
{/* function InsideRootTabNavigator() {
  return (
    <Tab.Navigator
    initialRouteName="OpenLetters"
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: Colors.lightyellow },
      headerPressColor: Colors.gray,
      tabBarActiveBackgroundColor: Colors.yellow,
    }}
    >
      how do i make it such that i can do a if/else condition: check if database got anything? if no then go create profile if yes go open letters?
      <Tab.Screen name="OpenLetters" component={OpenLettersScreen} options={{
        tabBarLabel: "Open Letters" ,
        tabBarIcon: ({focused}) => (
          <View>
            <Image source={require("../assets/images/OpenLetters.png")} 
              style={{
              resizeMode:"contain",
              height: 35,
              width: 100,
            }}
            />
          </View>
        ),
      }} />
      <Tab.Screen name="OpenJio" component={OpenJioScreen} options={{
        tabBarLabel: "Open Jio!",
        tabBarIcon: ({focused}) => (
          <View>
            <Image source={require("../assets/images/OpenJio!.png")} 
              style={{
              resizeMode:"contain",
              height: 29,
              width: 100,
            }}
            />
          </View>
        ), 
        }}/>
      <Tab.Screen name="CozyChat" component={CozyChatScreen} options={{
        tabBarLabel: "Cozy Chats",
        headerShown: true,
        //tabBarStyle: { display: "none"},
        tabBarIcon: ({focused}) => (
          <View>
            <Image source={require("../assets/images/CozyChat.png")} 
              style={{
              resizeMode:"contain",
              height: 25,
              width: 100,
            }}
            />
          </View>
        ),
        }}/>
      <Tab.Screen name="MyProfile" component={MyProfileScreen} options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({focused}) => (
          <View>
            <Image source={require("../assets/images/InitialProfile.png")} 
              style={{
              resizeMode:"contain",
              height: 28,
              width: 100,
            }}
            />
          </View>
        ),
        }}/>
        <Tab.Screen name="ChatHome" component={ChatHome} options={{
          //tabBarStyle: { display: "none" }
        }}/>
    </Tab.Navigator>
  )
}
*/}

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}