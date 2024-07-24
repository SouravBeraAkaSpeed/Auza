import { View, Text } from "react-native";
import React from "react";
import Logo from "./logo";

const ChatEmpty = () => {
  return (
    <View className="items-center justify-center h-screen">
      {/* <Logo textStyle="text-5xl text-brand-600/20" /> */}
      <Text className="font-pregular text-slate-500">
        Start a conversation with Auza
      </Text>
    </View>
  );
};

export default ChatEmpty;
