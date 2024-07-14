import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themecolors } from "../theme/themecolors";
import { Fontisto, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { dummy, shorts } from "../const";
import { useState } from "react";
import Short from "../components/Short";
import Video from "../components/Video";
import { fetchSuggestedVideos } from "../api/youtube";
import Loading from "../components/Loading";
import Categories from "../components/Categories";
import { toggleApi } from "../utils/toggleApis";

export default function Homescreen({ navigation }) {
  console.log("Home rendering");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState(dummy.data);
  const dataFetched = useRef(false);
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
    dataFetched.current = false;
    await fetchData();
  }, []);

  const fetchData = async () => {
    console.log("fetchdata");
    if (dataFetched.current) return;

    try {
      setLoading(true);
      if (toggleApi.trending) {
        const data = await fetchSuggestedVideos();
        console.log("trending api called");
        setVideos(data);
      } else {
        setVideos(dummy.data);
      }
      dataFetched.current = true;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themecolors.bg }}>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
        }
      >
        {/* navbar with logo and search icons */}
        {/* <Player /> */}
        <SafeAreaView className="flex-row justify-between mx-3 mt-2">
          <View className="flex-row items-center space-x-1">
            <Fontisto name="youtube-play" size={18} color={themecolors.ytred} />
            <Text className="text-white font-bold text-xl tracking-tighter">
              YouTube
            </Text>
          </View>
          <View className="flex-row items-center space-x-6">
            <AntDesign name="videocamera" size={24} color="white" />
            <Pressable onPress={handleSearch}>
              <MaterialIcons name="search" size={28} color="white" />
            </Pressable>
          </View>
        </SafeAreaView>

        <ScrollView
          className="flex-1 mt-4"
          showsVerticalScrollIndicator={false}
        >
          <Categories />
          {/* TODO: suggested video here */}
          {/* <Video item={videos[0]} key={9999}/> */}

          {/* shorts */}
          {/* <View className="mt-2">
            <View className="mx-3 flex-row items-center space-x-2">
              <Image
                source={require("../assets/youtube-shorts-icon.png")}
                className="h-6 w-5"
              />
              <Text className="text-white font-bold text-lg tracking-tighter">
                Shorts
              </Text>
            </View>
            <FlatList
              className="rounded-xl p-2"
              data={shorts}
              renderItem={({ item, index }) => (
                <Short item={item} key={index} />
              )}
              numColumns={2}
              scrollEnabled={false}
            ></FlatList>
          </View> */}

          {/* videos */}
          {/* <View>
          <Text className="text-white">{Math.random() * 100}</Text>
        </View> */}

          {loading ? (
            <Loading />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
              {videos &&
                videos.map((item, index) => {
                  return <Video item={item} key={index} />;
                })}
            </ScrollView>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
