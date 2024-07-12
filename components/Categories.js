import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { categories } from "../const";
import { themecolors } from "../theme/themecolors";

export default function Categories() {
  const [active, setActive] = useState("All");

  return (
    <View className="py-2 pb-5">
      <ScrollView
        className="px-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((cat, index) => {
          let isActive = cat == active;
          let textClass = isActive ? "text-black" : "text-white";
          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: isActive ? "white" : themecolors.categories,
              }}
              className="rounded-md p-1.5 px-3 mr-2"
              onPress={() => {
                setActive(cat);
              }}
            >
              <Text className={textClass}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
