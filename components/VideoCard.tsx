import { View, Text, Image, TouchableOpacity } from "react-native";
import { Models } from "react-native-appwrite";
import { useState } from "react";
import { icons } from "@/constants";

interface Creator {
  username: string;
  avatar: string;
}

interface Video extends Models.Document {
  title: string;
  thumbnail: string;
  video: string;
  creator: Creator;
}
interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border  border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator.username}
            </Text>
          </View>
        </View>

        <View className="pt-2 ">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
