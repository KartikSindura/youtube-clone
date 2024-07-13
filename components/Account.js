import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import {  View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themecolors } from "../theme/themecolors";
import { SvgXml } from "react-native-svg";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // console.log(user.user_metadata)
      if (user.user_metadata) {
        setUsername(user.user_metadata.username);
        setEmail(user.user_metadata.email);
        setAvatarUrl(user.user_metadata.avatarurl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ backgroundColor: themecolors.bg }} className="flex-1">
      {loading ? (
        <SafeAreaView>
          <View className="p-3 flex-row items-center space-x-3">
            {/* <Image source={avatarUrl} className="rounded-full h-20 w-20" /> */}
            <View className="rounded-full h-20 w-20 bg-zinc-800"></View>
            <View>
              <Text className="text-white text-2xl font-bold bg-zinc-800 rounded-xl"></Text>
              <Text className="text-zinc-400 text-xs bg-zinc-800 rounded-e-xl"></Text>
            </View>
          </View>
          <View>
            <Text className="text-white"></Text>
          </View>
          <View className="p-3">
            <Pressable
              className="items-center p-3 rounded-lg"
              onPress={() => supabase.auth.signOut()}
              style={{ backgroundColor: themecolors.categories }}
            >
              <Text className="text-white">Sign out</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{ backgroundColor: themecolors.bg }}
          className="flex-1"
        >
          <View className="p-3 flex-row items-center space-x-3">
            {/* <Image source={avatarUrl} className="rounded-full h-20 w-20" /> */}
            <View className="rounded-full h-20 w-20 bg-[#b6e3f4]">
              <SvgXml xml={avatarUrl} />
            </View>
            <View>
              <Text className="text-white text-2xl font-bold">{username}</Text>
              <Text className="text-zinc-400 text-xs">{email}</Text>
            </View>
          </View>
          <View>
            <Text className="text-white"></Text>
          </View>
          <View className="p-3">
            <Pressable
              className="items-center p-3 rounded-lg"
              onPress={() => supabase.auth.signOut()}
              style={{ backgroundColor: themecolors.categories }}
            >
              <Text className="text-white">Sign out</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

//   return (
//     <View style={styles.container}>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Input label="Email" value={session?.user?.email} disabled />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Input
//           label="Username"
//           value={username || ""}
//           onChangeText={(text) => setUsername(text)}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Input
//           label="Website"
//           value={website || ""}
//           onChangeText={(text) => setWebsite(text)}
//         />
//       </View>

//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Button
//           title={loading ? "Loading ..." : "Update"}
//           onPress={() =>
//             updateProfile({ username, website, avatar_url: avatarUrl })
//           }
//           disabled={loading}
//         />
//       </View>

//       <View style={styles.verticallySpaced}>
//         <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     paddingTop: 4,
//     paddingBottom: 4,
//     alignSelf: "stretch",
//   },
//   mt20: {
//     marginTop: 20,
//   },
// });
