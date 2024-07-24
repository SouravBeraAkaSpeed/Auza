import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
// import Logo from "./logo";
import { FontAwesome } from "@expo/vector-icons";
import newlogo from "@/assets/images/newlogosblack.png"; 
// import newlogo from "../assets/images/newlogosblack.png";

const Header = () => {
  return (
    <View className="top-5 w-full justify-between h-20 flex-row items-center pt-2 px-5 shadow-md rounded-3xl shadow-black/50 bg-white z-10">
      {/* <Logo textStyle="text-3xl text-brand-400" /> */}
      <Image
              source={newlogo}
              style={{ width: 100, height: 100, top:10, marginLeft:-5 }}
              className="mb-4"
            />
      <View className="flex-row gap-5">
      <TouchableOpacity>
      <FontAwesome name="bars" size={20} color="black" />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
