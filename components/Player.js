import React, { useState, useCallback } from "react";
import { View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Player({ videoId }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={245}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
}
