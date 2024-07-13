import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import Homescreen from "./screens/Homescreen";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import Account from "./components/Account";
import Auth from "./components/Auth";
import { Session } from "@supabase/supabase-js";
import { Ionicons } from "@expo/vector-icons";
import { themecolors } from "./theme/themecolors";
import Searchscreen from "./screens/Searchscreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Playerscreen from "./screens/Playerscreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  function Homestack() {
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
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons name="home" size={24} color="white" />
              ) : (
                <Ionicons name="home-outline" size={24} color="white" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={session && session.user ? Account : Auth}
          // component={Profilescreen}
          options={{ headerShown: false }}
        />

        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themecolors.bg}}>
      <StatusBar barStyle="light-content" backgroundColor={themecolors.bg} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Homestack" component={Homestack} />
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
      </NavigationContainer>
    </SafeAreaView>
  );
}
