import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { dummy } from "../const";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "../components/Video";
import { themecolors } from "../theme/themecolors";
import Searchbar from "../components/Searchbar";

export default function Searchresultscreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    // const data = await fetchSuggestedVideos().then(console.log("api called"));
    // setVideos(data)
    setVideos(dummy.data);
    setLoading(false);
  };
  const handleSearch = () => {
    navigation.navigate("Search");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themecolors.bg}}>
        <Searchbar />
      {loading ? (
        <View>
          <Text className="text-white">Loading</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
          {videos.map((item, index) => {
            return <Video item={item} key={index} />;
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
