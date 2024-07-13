import { View, Text, Image } from "react-native";
import React from "react";
import Player from "../components/Player";
import { useNavigation } from "@react-navigation/native";
import { themecolors } from "../theme/themecolors";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatViews } from "../utils/numbers";
import Commentbox from "../components/Commentbox";

export default function Playerscreen({ route }) {
  //   const navigation = useNavigation();
  const { item } = route.params;
  return (
    <SafeAreaView
      style={{ backgroundColor: themecolors.bg }}
      className="flex-1"
    >
      <Player videoId={item.videoId} />
      <View className="p-3">
        <Text className="text-white font-bold text-lg mb-2 tracking-tighter leading-6">
          {item.title.length > 95
            ? item.title.slice(0, 95) + "..."
            : item.title}
        </Text>
        <Text className="text-zinc-400 text-xs mb-4">
          {formatViews(item.viewCount)} views   {item.publishedText}
        </Text>
        <View className="flex-row items-center space-x-3 mb-5">
          <Image
            source={{ uri: item.channelThumbnail[0].url }}
            className="h-9 w-9 rounded-full"
          />
          <Text className="text-white font-semibold text-md">
            {item.channelTitle}
          </Text>
        </View>
        <Commentbox videoId={item.videoId}/>
      </View>
      
    </SafeAreaView>
  );
}
