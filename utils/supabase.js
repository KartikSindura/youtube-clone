import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export const insertSearch = async (input) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("User not authenticated");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("searches")
      .insert({ query: input, user_id: user.id });

    if (error) throw error;
    console.log("Search inserted: ", data);
  } catch (error) {
    console.error("Error inserting search:", error.message);
  }
};

export const insertWatched = async (videoId) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("User not authenticated");
    return;
  }

  try {
    const { data, error } = await supabase.from("watched").insert({
      video_id: videoId,
      user_id: user.id, // Add the user's ID to the watched record
    });

    if (error) throw error;
    console.log("Watched video inserted:", data);
  } catch (error) {
    console.error("Error inserting watched video:", error.message);
  }
};

export const getSearchHistory = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from("searches")
      .select(`query, search_id`)
      .eq("user_id", user.id);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error getting search history:", error.message);
    throw error;
  }
};

// export const getAdditionalMetaData = async () => {

//   try {
//     const { data, error } = await supabase
//       .from("auth.users")
//       .select("raw_user_meta_data")
//       .eq("id", user.id);
//   } catch (error) {
//     console.error("Error insreting into profile:", error.message);
//   }
// };

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
