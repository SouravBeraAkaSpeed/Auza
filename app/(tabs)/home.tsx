import ChatbotTag from "@/components/chatbot-tag";
import NewsCard from "@/components/news-card";
import { NEWS_FEED } from "@/constants/content/news";
import React from "react";
import { FlatList, View } from "react-native";

const home = () => {
  // TODO: change the homepage for the app for now it's the same as the news page
  return (
    <>
      <ChatbotTag />
      <View className="py-2">
        <FlatList
          data={NEWS_FEED || []}
          renderItem={({ item }) => <NewsCard data={item} />}
        />
      </View>
    </>
  );
};

export default home;
