import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themecolors } from "../theme/themecolors";
import { SvgUri } from "react-native-svg";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();
  // const [historyVideos, setHistoryVideos] = useState([]);

  useEffect(() => {
    getProfile();
    // getHistoryVideos();
    // console.log("fetch");
  }, []);

  // async function getHistoryVideos() {
  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     const { data: history_data, error } = await supabase
  //       .from("watched")
  //       .select(`video_title, video_thumbnail, channel_title`, {
  //         distinct: true,
  //       })
  //       .eq("user_id", user.id);

  //     if (error) {
  //       console.error("Error fetching history:", error);
  //       return;
  //     }
  //     setHistoryVideos(history_data);
  //   } catch (error) {
  //     console.error("Unexpected error in getHistoryVideos:", error);
  //   }
  // }

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

  // const renderHistoryTerm = ({ item }) => (
  //   <Pressable className="pr-3">
  //     <Image
  //       source={{ uri: item.video_thumbnail }}
  //       className="w-36 h-20 rounded-lg mb-1.5"
  //     />
  //     <View className="w-36">
  //       <Text className="text-white flex-grow mb-1">
  //         {item.video_title.length > 36
  //           ? item.video_title.slice(0, 36) + "..."
  //           : item.video_title}
  //         {/* {item.video_title} */}
  //       </Text>
  //     </View>
  //     <Text className="text-zinc-400 text-sm">{item.channel_title}</Text>
  //   </Pressable>
  // );

  return (
    <View style={{ backgroundColor: themecolors.bg }} className="flex-1 p-3">
      {loading ? (
        <SafeAreaView className="mt-14">
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
          <View className="">
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
          className="mt-14"
        >
          <View className="p-3 flex-row items-center space-x-3">
            {/* <Image source={avatarUrl} className="rounded-full h-20 w-20" /> */}
            <View className="rounded-full h-20 w-20 bg-[#b6e3f4]">
              {/* <SvgXml xml={avatarUrl} /> */}
              <SvgUri uri={avatarUrl}/>
            </View>
            <View className="p-3">
              <Text className="text-white text-2xl font-bold">{username}</Text>
              <Text className="text-zinc-400 text-xs">{email}</Text>
            </View>
          </View>
          {/* HISTORY */}
          {/* <View>
            <Text className="text-white text-lg font-bold mt-6 mb-4">
              History
            </Text>
            <View className="">
              {historyVideos && historyVideos.length > 0 ? (
                <FlatList
                  renderItem={renderHistoryTerm}
                  data={historyVideos}
                  keyExtractor={(item) => item.watch_id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text className="text-white">no watch history</Text>
              )}
            </View>
          </View> */}
          <View className="mt-4">
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
