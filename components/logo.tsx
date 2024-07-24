import { View, Text } from "react-native";
import React from "react";
import clsx from "clsx";

interface LogoProps {
  textStyle?: string;
}

const Logo = ({ textStyle }: LogoProps) => {
  return <Text className={clsx(`font-nasa`, textStyle)}>Auza</Text>;
};

export default Logo;
