import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import Homescreen from "./screens/Homescreen";
import { useState, useEffect, useMemo, memo } from "react";
import { supabase } from "./utils/supabase";
import Account from "./components/Account";
import Auth from "./components/Auth";
import { Ionicons } from "@expo/vector-icons";
import { themecolors } from "./theme/themecolors";
import Searchscreen from "./screens/Searchscreen";
import { SafeAreaView } from "react-native-safe-area-context";
import Playerscreen from "./screens/Playerscreen";
import AppNavigator from "./components/AppNavigator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("auth event change", _event)
      setSession(session);
    });
  }, []);

  const memoizedContent = useMemo(() => (
    <AppNavigator session={session} />
  ), [session]);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themecolors.bg }}
    >
      <StatusBar barStyle="light-content" backgroundColor={themecolors.bg} />
      <NavigationContainer>
        {memoizedContent}
      </NavigationContainer>
    </SafeAreaView>
  );
}
