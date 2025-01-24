import { View, Text, FlatList } from "react-native";
import React from "react";

interface TrendingProps {
  items: { id: number }[];
}

const Trending: React.FC<TrendingProps> = ({ items }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <Text className="text-white text-3xl">{item.id}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;
