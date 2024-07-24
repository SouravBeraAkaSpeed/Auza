import CustomButton from "@/components/custom-button";
import Logo from "@/components/logo";
import { HOW_TO_USE, WORKING } from "@/constants/content/hero";
import React from "react";
import { ScrollView, Text, View, ImageBackground, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import back from "@/assets/images/back.jpeg"; // Make sure to adjust the path according to your project structure
import newlogoshadow from "@/assets/images/newlogoshadow.png"; 
const Index = () => {
  return (
    <ImageBackground source={back} style={{ flex: 1 }}>
      <SafeAreaView className="h-full bg-opacity-90">
        <ScrollView className="px-4">
          <View className="h-screen items-center justify-center">
            {/* <Logo textStyle="text-8xl text-brand-400" /> */}
            <Image
              source={newlogoshadow}
              style={{ width: 200, height: 200 }} // Adjust the width and height as needed
              className="mb-4"
            />
            <Text className="text-white font-psemi text-3xl mt-3">
              Offline Messaging
            </Text>
            <Text className="text-center text-white mt-2 font-pregular">
              Auza is a free messaging app that works without the Internet.
              Perfect for natural disasters, large events, and at school!
            </Text>
            <CustomButton
              onPress={() => router.push("/home")}
              text="Start Messaging"
              buttonStyles="mt-6 w-full py-4 bg-white text-black"
            />
          </View>
          <View className="">
            <Text className="text-brand-500 font-psemi text-4xl">
              How to use Auza
            </Text>
            <View className="gap-4 mt-4">
              {HOW_TO_USE.map((item, index) => (
                <View
                  key={index}
                  className="min-h-[130px] bg-dark/5 rounded-2xl items-center justify-center px-6"
                >
                  <Text className="text-dark font-pregular">{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="mt-24">
            <Text className="text-brand-500 font-psemi text-4xl">
              How does Auza work?
            </Text>
            <View className="gap-4 mt-4">
              {WORKING.map((item, index) => (
                <View
                  key={index}
                  className="min-h-[130px] bg-dark/5 rounded-2xl items-center justify-center p-6"
                >
                  <Text className="text-dark font-pregular">{item.text}</Text>
                </View>
              ))}
              <View className="flex-row items-center justify-end pb-4">
                <Text className="text-brand-500 font-psemi">Learn more</Text>
                <Entypo name="chevron-right" size={24} color="#5a189a" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Index;
