// AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Homescreen from "../screens/Homescreen";
import Account from "../components/Account";
import Auth from "../components/Auth";
import Searchscreen from "../screens/Searchscreen";
import Playerscreen from "../screens/Playerscreen";
import { themecolors } from "../theme/themecolors";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { SvgUri } from "react-native-svg";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs({ session }) {
  // console.log(session.user.user_metadata.avatarurl)
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: themecolors.bg,
          borderColor: themecolors.bg,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="white" />
            ) : (
              <Ionicons name="home-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name={session && session.user ? "You" : "Sign in"}
        component={session && session.user ? Account : Auth}
        options={{
          headerShown: false,
          tabBarIcon: () =>
            session && session.user ? (
              <AntDesign name="user" size={24} color="white" />
            ) : (
              //   <SvgXml xml={session.user.user_metadata.avatarurl}/> // PERFORMANCE ISSUES
              // <SvgUri uri={session.user.user_metadata.avatarurl} /> // ALSO PERFORMANCE ISSUES !???? ???
              <MaterialIcons name="login" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator({ session }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs">
        {(props) => <HomeTabs {...props} session={session} />}
      </Stack.Screen>
      <Stack.Screen
        name="Search"
        component={Searchscreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
      <Stack.Screen
        name="Player"
        component={Playerscreen}
        options={{ headerShown: false, tabBarStyle: { display: "none" } }}
      />
    </Stack.Navigator>
  );
}
