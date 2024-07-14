import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getSearchHistory } from "../utils/supabase";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Loading from "./Loading";

export default function SearchHistory({ onSearchSelect }) {
  const [searches, setSearches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const data = await getSearchHistory();
        setSearches(data || []);
      } catch (err) {
        setError(err.message);
        setSearches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchHistory();
  }, []);

  const renderSearchItem = ({ item }) => (
    <Pressable
      className="p-4"
      onPress={() => {
        onSearchSelect(item.query);
      }}
    >
      <View className="flex-row items-center">
        <View className="text-2xl mr-4">
          <MaterialCommunityIcons name="history" size={24} color="white" />
        </View>
        <View className="flex-grow flex-1">
          <Text className="text-white">
            {item.query.length > 90
              ? item.query.slice(0, 90) + "..."
              : item.query}
          </Text>
        </View>
        <View>
          <Feather name="arrow-up-left" size={24} color="white" />
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      {searches && searches.length > 0 ? (
        <FlatList
          data={searches}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.search_id.toString()}
        />
      ) : (
        <View className="items-center justify-center p-5">
          <Text className="text-white">No search history</Text>
        </View>
      )}
    </View>
  );
}
