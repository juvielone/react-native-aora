import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPost } from "@/lib/appwrite";
import { Models } from "react-native-appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const mockData = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const { data: posts, refetch } = useAppwrite(getAllPost);

  const onRefresh = async () => {
    setRefreshing(true);
    //recall new videos if there's new
    await refetch();
    setRefreshing(false);
  };
  console.log(posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => {
          // const {title, thumbnail,video, creator} = item;
          // const data = {title,thumbnail,video,
          //   creator: {
          //     username: creator.username,
          //     avatar: creator.avatar
          //   }
          // }
          // console.log(item);
          return <VideoCard video={item as any} />;
        }}
        // renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View
              className="justify-between items-start
            flex-row mb-6"
            >
              <View>
                <Text className="text-gray-100 font-pmedium text-sm">
                  Welcome Back
                </Text>
                <Text className="text-white text-2xl font-psemibold">
                  Juvielone
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-24 h-10 "
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending items={mockData ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
