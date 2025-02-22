import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/lib/useAppwrite";
import { searchPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import Trending from "@/components/Trending";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  console.log(query, posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item as any} />;
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-gray-100 font-pmedium text-sm">
              Search Results
            </Text>
            <Text className="text-white text-2xl font-psemibold">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
