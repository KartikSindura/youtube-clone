import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Pressable,
  Text,
} from "react-native";
import { supabase } from "../utils/supabase";
import { Input } from "@rneui/themed";
import { themecolors } from "../theme/themecolors";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useNavigation } from "@react-navigation/native";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [avatar_url, setAvatarUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [signUpInstead, setSignUpInstead] = useState(false);

  const makeAvatar = () => {
    const avatar = createAvatar(lorelei, {
      seed: Math.random().toString(36).slice(2, 7),
      // ... other options
    }).toString();
    return avatar;
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const avatar_url = makeAvatar();
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          avatarurl: avatar_url,
        },
      },
    });

    if (error) Alert.alert(error.message);
    // insertProfile();
    // if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false);
  }

  return (
    <View className="flex-1">
      {signUpInstead ? (
        <View style={styles.container}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Username"
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={(text) => setUsername(text)}
              value={username}
              placeholder="Username"
              defaultValue="Username"
              autoCapitalize={"none"}
              inputStyle={{ color: "#fff" }}
            />
          </View>
          <View style={[styles.verticallySpaced]}>
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              inputStyle={{ color: "#fff" }}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
              inputStyle={{ color: "#fff" }}
            />
          </View>
          <View style={styles.verticallySpaced} className="p-3">
            <Pressable
              disabled={loading}
              onPress={async () => {
                signUpWithEmail();
              }}
              style={{ backgroundColor: themecolors.categories }}
              className="items-center p-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-lg">Sign up</Text>
            </Pressable>
            <Pressable
              className="items-center p-4"
              onPress={() => {
                setSignUpInstead(false);
              }}
            >
              <Text className="text-white">Sign in instead</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={[styles.verticallySpaced, styles.mt20]}></View>
          <View style={[styles.verticallySpaced]}>
            <Input
              label="Email"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              inputStyle={{ color: "#fff" }}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
              inputStyle={{ color: "#fff" }}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]} className="p-3">
            <Pressable
              disabled={loading}
              onPress={() => {
                signInWithEmail();
              }}
              style={{ backgroundColor: themecolors.categories }}
              className="items-center p-3 rounded-lg"
            >
              <Text className="text-white font-semibold text-lg">Sign in</Text>
            </Pressable>
            <Pressable
              className="items-center p-4 "
              onPress={() => {
                setSignUpInstead(true);
              }}
            >
              <Text className="text-white">Sign up instead</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: themecolors.bg,
    flex: 1,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
