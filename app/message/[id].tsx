import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { DUMMY_DATA } from "@/constants/content/messages";
import Message from "@/components/message";
import ChatEmpty from "@/components/chat-empty";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();

  const sortedData = DUMMY_DATA.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  const sendhandler = () => {};

  return (
    <>
      <View className="h-24 flex-row items-center justify-between pt-8 px-4 bg-white">
        <TouchableOpacity onPress={() => router.push("/message")}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row flex-1 space-x-4 items-center ml-4 rounded-b-3xl">
          {/* <View className="h-12 w-12"> */}
            {/* <Image
              source={require("../../assets/images/logoai.png")}
              resizeMode="contain"
              className="w-full h-full rounded-full"
            /> */}
          {/* </View> */}
          <Text className="text-xl capitalize text-black">{id}</Text>
        </View>
        <TouchableOpacity>
          <SimpleLineIcons name="options-vertical" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedData || []}
        renderItem={({ item }) => (
          <View className="w-full">
            <Message data={item} />
          </View>
        )}
        ListEmptyComponent={() => <ChatEmpty />}
        inverted={DUMMY_DATA.length > 0}
        scrollsToTop
        className="h-full px-4"
      />
      <View className="h-16 px-4 py-2 relative">
        <TextInput
          className="h-full w-full rounded-full px-4 pr-12"
          placeholder="Type a message"
          cursorColor={"#9d4edd"}
        />
        <TouchableOpacity className="absolute top-1/2 -translate-y-1/2 right-10">
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChatScreen;
