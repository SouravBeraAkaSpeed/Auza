import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { OFFICIALS, PEOPLES } from "@/constants/content/messages";

import { FontAwesome } from "@expo/vector-icons";

const Message = () => {
  return (
    <ScrollView>
      <View className="bg-brand-800 px-4 py-6 pb-12">
        <Text className="text-slate-100 font-psemi text-3xl">Message</Text>
        <Text className="mt-12 text-slate-200 font-psemi">
          Contact official support in your locality
        </Text>
        <View className="flex-row items-center mt-6 space-x-6">
          {OFFICIALS.map((official) => (
            <TouchableOpacity
              key={official.id}
              className="space-y-3 p-2 bg-slate-50 h-[70px] w-[70px] rounded-full"
              onPress={() => router.push(official.route)}
            >
              <Image
                source={official.image}
                className="w-full h-full rounded-full"
              />
              <Text
                className="text-center text-[10px] text-slate-100 font-psemi"
                numberOfLines={1}
              >
                {official.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="px-4 mt-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-psemi">People</Text>
          <FontAwesome name="bluetooth" size={24} color="#278EF6" />
        </View>
        <View>
          {PEOPLES.map((people, index) => (
            <TouchableOpacity
              key={people.id}
              className="flex-row items-center border-b  border-black/10 py-5"
              onPress={() => router.push(people.route)}
            >
              <Image source={people.image} className="w-12 h-12 rounded-full" />
              <Text className="ml-4 text-medium font-psemi">{people.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Message;
