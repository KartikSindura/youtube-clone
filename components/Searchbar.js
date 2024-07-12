import { View, TextInput, Pressable } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Searchbar() {
  const navigation = useNavigation();
  const inputRef = useRef();
  const [input, setInput] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <View className="flex-row space-x-2 items-center p-3">
      <Pressable
        className="pr-2"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </Pressable>
      <View className="flex-1">
        <TextInput
          autoFocus
          className="text-white bg-[#212121] pl-3 rounded-3xl h-8"
          placeholder="Search YouTube"
          ref={inputRef}
          onLayout={() => inputRef.current.focus()}
          placeholderTextColor={"#a3a3a3"}
          cursorColor={"#a3a3a3"}
          value={input}
          onChangeText={(text) => {
            setInput(text);
          }}
          onSubmitEditing={() => {
            setShowSearchResults(true);
            navigation.navigate("Searchresult");
          }}
        />
      </View>
      <View className="rounded-full h-8 w-8 bg-[#212121] items-center justify-center">
        <MaterialIcons name="mic" size={24} color="white" />
      </View>
    </View>
  );
}
