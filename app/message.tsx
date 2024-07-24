import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Redirect, router } from "expo-router";
  import { OFFICIALS, PEOPLES } from "@/constants/content/messages";
  
  import { FontAwesome } from "@expo/vector-icons";
  import { EvilIcons } from "@expo/vector-icons";
  import { User } from "@/lib/types";
  import clsx from "clsx";
  
  const Message = () => {
    const [users, setUser] = useState<User[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(
          "https://randomuser.me/api/?results=10&nat=us,dk,fr,gb",
          {
            method: "GET",
          }
        );
        const data = await res.json();
        setUser(data.results);
      };
  
      fetchData();
    }, []);
  
    return (
      <ScrollView>
        <View className="relative mx-4 h-16 mt-6 rounded-full border border-gray-700 items-center justify-center">
          <TextInput
            className="h-full w-full px-4 rounded-xl pr-10"
            cursorColor={"#0004"}
            placeholder="Search"
          />
          <TouchableOpacity className="absolute right-4">
            <EvilIcons name="search" size={30} color="gray" className="h-full" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal className="h-[120px] pt-3 px-4">
          {OFFICIALS.map((official) => (
            <TouchableOpacity
              key={official.id}
              className="space-y-1.5 p-2 h-[70px] w-[70px] rounded-full mr-6"
              onPress={() => router.push(official.route)}
            >
              <View className="rounded-full h-full w-full h-">
                <Image
                  source={official.image}
                  className="w-full h-full rounded-full"
                />
              </View>
              <Text
                className="text-center text-[10px] text-dark font-psemi"
                numberOfLines={1}
              >
                {official.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="px-4">
          <View className="divide-y-2 divide-dark/10">
            {users.map((people, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={people.login.uuid}
                className="flex-row items-center py-5 justify-between pr-2"
                onPress={() => router.push(`/message/${people.name.first}`)}
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: people.picture.thumbnail }}
                    className="w-12 h-12 rounded-full"
                  />
                  <View className="ml-4 ">
                    <Text className="text-medium font-psemi">
                      {people.name.first} {people.name.last}
                    </Text>
                    <Text
                      className={clsx(
                        "text-xs",
                        index <= 2 ? "font-psemi" : "font-pregular"
                      )}
                    >
                      Hey there! I'm using Auza
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    className={clsx(
                      "text-xs",
                      index <= 2 ? "font-psemi" : "font-pregular"
                    )}
                  >
                    Mon
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default Message;
  