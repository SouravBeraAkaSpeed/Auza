import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

const ChatbotTag = () => {
  return (
    <TouchableOpacity className="absolute bottom-5 right-4 rounded-full h-[65px] w-[65px] bg-white items-center justify-center z-10"
      onPress={() =>{
        router.push("/bot");
        
      }}

    >
      <Image
        source={require("../assets/images/logonewnoshadow.png")}
        className="h-8 w-8 rounded-3xl"
      />
    </TouchableOpacity>
  );
};

export default ChatbotTag;
