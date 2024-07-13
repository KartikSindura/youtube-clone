import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { formatViews } from "../utils/numbers";
import { useNavigation } from "@react-navigation/native";
import { insertWatched, supabase } from "../utils/supabase";

export default function Video({ item, index }) {
  const navigation = useNavigation();

  const handleClick = async () => {
    await insertWatched(item.videoId);
    navigation.navigate("Player", {
      item: item,
    });
  };
  
  return (
    <Pressable onPress={handleClick}>
      <Image source={{ uri: item.thumbnail[0].url }} className="h-52 w-full" />
      <View className="flex items-end mr-2 mb-5 -mt-6">
        <View className="bg-black rounded px-1">
          <Text className="text-white font-semibold text-xs">
            {item.lengthText}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center pb-5 space-x-3 mx-2">
        <Image
          source={{ uri: item.channelThumbnail[0].url }}
          className="h-9 w-9 rounded-full"
        />
        <View className="flex-1 space-y-1">
          <Text className="text-white font-semibold">{item.title}</Text>
          <Text className="text-zinc-400 text-xs">
            {item.channelTitle.length > 20
              ? item.channelTitle.slice(0, 20) + "..."
              : item.channelTitle}{" "}
            · {formatViews(item.viewCount)} views · {item.publishedText}
          </Text>
        </View>
        <View className="self-start mr-2 mt-1.5">
          <Entypo name="dots-three-vertical" size={12} color="white" />
        </View>
      </View>
    </Pressable>
  );
}
