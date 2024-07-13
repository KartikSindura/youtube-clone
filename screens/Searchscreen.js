import { View, TextInput, Pressable, Text, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { themecolors } from "../theme/themecolors";
import { SafeAreaView } from "react-native-safe-area-context";
import { dummy_search } from "../const";
import Video from "../components/Video";
import Loading from "../components/Loading";
import { fetchSearchedVideos } from "../api/youtube";
import { toggleApi } from "../utils/toggleApis";
import { insertSearch } from "../utils/supabase";
import SearchHistory from "../components/SearchHistory";

export default function Searchscreen({ navigation }) {
  const inputRef = useRef();
  const [input, setInput] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState(dummy_search.data);

  // const insertSearch = async (input) => {
  //   const { data: { user } } = await supabase.auth.getUser();
  //   if (!user) {
  //     console.log("User not authenticated");
  //     return;
  //   }

  //   try {
  //     const { data, error } = await supabase
  //       .from("searches")
  //       .insert({ query: input, user_id: user.id });

  //     if (error) throw error;
  //     console.log("Search inserted: ", data);
  //   } catch (error) {
  //     console.error("Error inserting search:", error.message);
  //   }
  // };

  const fetchSearchedData = async () => {
    try {
      if (toggleApi.search) {
        setLoading(true);
        const data = await fetchSearchedVideos(input);
        console.log("search api called");
        setVideos(data);
      } else {
        setLoading(true);
        setVideos(dummy_search.data);
      }
    } catch (error) {
      console.error("API failed:", error);
    } finally {
      setLoading(false);
      setShowSearchResults(true);
    }
  };

  const check = () => {
    if (loading) {
      return <Loading />;
    }

    if (showSearchResults) {
      return (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
          {videos &&
            videos.map((item, index) => <Video item={item} key={index} />)}
        </ScrollView>
      );
    }
    return <SearchHistory />;
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themecolors.bg }}
    >
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
            onSubmitEditing={async () => {
              if (input === "" || input === null) {
                navigation.navigate("Home");
              } else {
                await insertSearch(input);
                await fetchSearchedData();
              }
              // setShowSearchResults(true);
            }}
          />
        </View>
        <View className="rounded-full h-8 w-8 bg-[#212121] items-center justify-center">
          <MaterialIcons name="mic" size={24} color="white" />
        </View>
      </View>
      {/* Results */}
      {check()}
    </SafeAreaView>
  );
}
