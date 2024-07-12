import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function Short({ item }) {
  return (
    <View className="h-[280px] flex-1 relative m-1 justify-between">
      <Image
        source={item.image}
        className="h-full w-full absolute rounded-xl"
      />
      <View className="justify-end flex-row pt-3.5 pr-2.5">
        <Entypo name="dots-three-vertical" size={12} color="white" />
      </View>
      <View className="p-2">
        <Text className="text-white shadow-lg font-semibold text-sm">{item.title}</Text>
        {/* <Text className="text-white shadow-md font-extrabold text-xs">{item.viewCount} views</Text> */}
      </View>
    </View>
  );
}
