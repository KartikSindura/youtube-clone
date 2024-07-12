import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { themecolors } from "../theme/themecolors";
import { fetchComments } from "../api/youtube";
import { dummy_comment } from "../const";
import { toggleApi } from "../utils/toggleApis";

export default function Commentbox({ videoId }) {
  const [commentData, setCommentData] = useState(dummy_comment);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      if (toggleApi.comments) {
        setLoading(true);
        const data = await fetchComments(videoId);
        console.log("comments api called");
        setCommentData(data);
      } else {
        setLoading(true);
        setCommentData(dummy_comment);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <View>
      {!loading ? (
        <View
          className="rounded-2xl p-3"
          style={{ backgroundColor: themecolors.categories }}
        >
          <View className="flex-row space-x-1 items-center mb-2">
            <Text className="text-white">Comments</Text>
            <Text className="text-zinc-400 text-xs">
              {commentData.commentsCount}
            </Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <Image
              source={{ uri: commentData.data[0].authorProfileImageUrl[0].url }}
              className="h-6 w-6 rounded-full"
            />
            <Text className="text-white text-xs flex-1">
              {commentData.data[0].textDisplay}
            </Text>
          </View>
        </View>
      ) : (
        <View
          className="rounded-2xl p-3"
          style={{ backgroundColor: themecolors.categories }}
        >
          <View className="flex-row space-x-1 items-center mb-2">
            <Text className="text-white">Comments</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <View className="h-6 w-6 rounded-full bg-zinc-800" />
            <View className="rounded-2xl h-5 w-80 bg-zinc-800"></View>
          </View>
        </View>
      )}
    </View>
  );
}
