import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { themecolors } from "../theme/themecolors";
import { fetchComments } from "../api/youtube";
import { dummy_comment } from "../const";
import { toggleApi } from "../utils/toggleApis";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

export default function Commentbox({ videoId }) {
  const [commentData, setCommentData] = useState(dummy_comment);
  const [loading, setLoading] = useState(true);
  const bottomSheet = useRef();

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

  function check() {
    if (loading) {
      return (
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
      );
    }

    if (commentData.data.length == 0) {
      return (
        <View
          className="rounded-2xl p-3"
          style={{ backgroundColor: themecolors.categories }}
        >
          <View className="flex-row space-x-1 items-center mb-3">
            <Text className="text-white">Comments</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <Text className="text-white text-xs flex-1">No comments yet</Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        <RBSheet
          closeOnPressBack={true}
          draggable={false}
          ref={bottomSheet}
          height={628}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: themecolors.categories,
            },
            container: {
              backgroundColor: themecolors.bg,
            },
          }}
          customModalProps={{
            animationType: "slide",
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >
          <View className="flex-1">
            <View className="flex-row justify-between p-4">
              <Text className="text-white font-bold text-xl">Comments</Text>
              <Pressable
                onPress={() => {
                  bottomSheet.current.close();
                }}
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
            </View>
            <ScrollView className="flex-1 p-3">
              {commentData.data &&
                commentData.data.map((item, index) => {
                  return (
                    <View className="flex-col mb-7">
                      <View className="flex-row space-x-3 ">
                        <Image
                          source={{
                            uri: item.authorProfileImageUrl[0].url,
                          }}
                          className="h-6 w-6 rounded-full "
                        />
                        <Text className="text-zinc-400 text-xs">
                          {item.authorDisplayName} · {item.publishedTimeText}
                        </Text>
                      </View>
                      <View className="">
                        <Text className="text-white text-sm ml-10">
                          {item.textDisplay}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </RBSheet>

        <Pressable
          className="rounded-2xl p-3"
          style={{ backgroundColor: themecolors.categories }}
          onPress={() => bottomSheet.current.open()}
        >
          <View className="flex-row space-x-1 items-center mb-2">
            <Text className="text-white">Comments</Text>
            <Text className="text-zinc-400 text-xs">
              {commentData.commentsCount}
            </Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <Image
              source={{
                uri: commentData.data[0].authorProfileImageUrl[0].url,
              }}
              className="h-6 w-6 rounded-full"
            />
            <Text className="text-white text-xs flex-1">
              {commentData.data[0].textDisplay}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return <View>{check()}</View>;
}
