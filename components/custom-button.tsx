import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import clsx from "clsx";

interface CustomButtonProps {
  onPress: () => void;
  text: string;
  buttonStyles?: string;
  textStyles?: string;
}

const CustomButton = ({
  onPress,
  text,
  buttonStyles,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx("bg-white py-2 px-4 rounded-xl", buttonStyles)}
    >
      <Text className={clsx("text-black font-medium text-center", textStyles)}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
