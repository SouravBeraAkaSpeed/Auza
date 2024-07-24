import { View, Text, Image } from "react-native";
import React from "react";
import { MessageType } from "@/lib/types";
import clsx from "clsx";
import { AntDesign } from "@expo/vector-icons";

interface MessageProps {
  data: MessageType;
}

const Message = ({ data: { id, sender, text, timestamp } }: MessageProps) => {
  return (
    <View
      className={clsx("my-1", sender === "user" ? "items-end" : "items-start")}
    >
      <View
        className={clsx(
          "flex-row min-w-[40%] max-w-[90%]",
          sender === "user" ? "justify-end" : "justify-start"
        )}
      >
        {sender === "bot" ? (
          <>
            {/* Uncomment if you want to display bot image
            <View className="h-10 w-10 rounded-full">
              <Image
                source={require("../assets/images/logonew.png")}
                className="h-full w-full"
              />
            </View> */}
            <View className="relative w-3/4 py-4 px-6 rounded-2xl bg-gray-700">
              <Text className="font-pregular text-white">{text}</Text>
              <View className="items-end">
                <Text className="text-[10px] text-gray-200">
                  {new Date(timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View className="absolute -top-1 -left-2 w-4 h-4 bg-gray-700 transform rotate-45"></View>
            </View>
          </>
        ) : (
          <>
            <View className="relative w-3/4 py-4 px-6 rounded-2xl bg-white">
              <Text className="font-pregular">{text}</Text>
              <View className="items-end">
                <Text className="text-[10px]">
                  {new Date(timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <View className="absolute -top-1 -right-2 w-4 h-4 bg-white transform rotate-45"></View>
            </View>
            {/* Uncomment if you want to display user icon
            <View className="h-10 w-10 bg-slate-700 rounded-full items-center justify-center">
              <AntDesign name="user" size={24} color="white" />
            </View> */}
          </>
        )}
      </View>
    </View>
  );
};

export default Message;
