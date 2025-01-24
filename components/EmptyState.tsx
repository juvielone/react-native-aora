import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface EmptyStateProp {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProp> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-white text-2xl font-psemibold">{title}</Text>
      <Text className="text-gray-100 font-pmedium text-sm">{subtitle}</Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
