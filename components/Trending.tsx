import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import { Models } from "react-native-appwrite";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

interface Creator {
  username: string;
  avatar: string;
}
interface VideoPosts extends Models.Document {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
}
interface VideoCardProps {
  videos: VideoPosts[];
}
interface TrendingItemProps {
  activeItem: string;
  item: VideoPosts;
}

const zoomIn = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  console.log(item.video);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 208, // Corresponds to w-52 (52 * 4)
            height: 288, // Corresponds to h-72 (72 * 4)
          }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            console.log(status);
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => {
            console.error("Video Error:", error);
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg
              shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<VideoCardProps> = ({ videos }) => {
  const [activeItem, setActiveItem] = useState(
    videos.length > 0 ? videos[0].$id : ""
  );

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      // if items is not empty make the active item the first
      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].key as string);
      }
    },
    []
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item: any) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      //triggered whenever the viewability of items in a FlatList changes(visible)
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
