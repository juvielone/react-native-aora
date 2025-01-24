import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Image } from "expo-image";
interface FormFieldProps {
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
}

const SearchInput: React.FC<FormFieldProps> = ({
  otherStyles,
  keyboardType,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl flex-row
        items-center ${isFocused ? "border-secondary" : "border-black-200"}`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 
        font-pregular focus:outline-none"
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" contentFit="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
