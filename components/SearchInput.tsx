import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface SearchProps {
  initialQuery?: string | string[];
}
const SearchInput: React.FC<SearchProps> = ({ initialQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View
      className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl flex-row
        items-center ${isFocused ? "border-secondary" : "border-black-200"}`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 
        font-pregular focus:outline-none"
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        value={query as string}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across the database"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
