import { Tabs } from 'expo-router';
import React from 'react';
import clsx from "clsx";
import {View} from "react-native";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/header';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
    <Header/>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#9d4edd",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#F8F8F8",
          height: 65,
          borderTopColor: "#EFEFEF",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon color={color} focused={focused} name="Home" />
            ),
          }}
        />

      <Tabs.Screen
          name="test"
          options={{
            title: "test",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon color={color} focused={focused} name="test" />
            ),
          }}
        />

        <Tabs.Screen
          name="live"
          options={{
            title: "Live",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon color={color} focused={focused} name="Live" />
            ),
          }}
        />

        <Tabs.Screen
          name="news"
          options={{
            title: "news",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon color={color} focused={focused} name="News" />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon color={color} focused={focused} name="Profile" />
            ),
          }}
        />

      {/* <Tabs.Screen
        name="intro"
        options={{
          title: 'Intro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'trail-sign' : 'trail-sign-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      /> */}

      {/* <Tabs.Screen
        name="ai"
        options={{
          title: 'Ai',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'} color={color} />
          ),
        }}
      /> */}

      {/* <Tabs.Screen
        name="chat"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      /> */}

      {/* <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'images-sharp' : 'images-sharp'} color={color} />
          ),
        }}
      /> */}


      {/* <Tabs.Screen
        name="test"
        options={{
          title: 'Test Env',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      /> */}

    </Tabs>
    </>
  );
}


interface TabIconProps {
  focused: boolean;
  name: string;
  color: string;
}

const TabIcon = ({ focused, name, color }: TabIconProps) => {
  return (
    <View
      className={clsx(
        "gap-1 rounded-t-xl",
        name === "Live"
          ? " border aspect-square items-center justify-center rounded-full h-16 w-16 border-white bg-white -translate-y-2 shadow shadow-black/50"
          : ""
      )}
    >
      <View className="items-center justify-center">
        {name === "Home" && (
          <Entypo
            name="home"
            size={20}
            color={focused ? "black":"grey"}
            className=""
          />
        )}
        {name === "News" && (
          <FontAwesome
            name="comment"
            size={20}
            color={focused ? "black":"grey"}
            className="regular"
          />
        )}
        {name === "test" && (
          <Entypo
          name="chat"
          size={20}
          color={focused ? "black":"grey"}
        />
          
        )}
        {name === "Live" && (
          <Entypo
            name="folder-video"
            size={20}
            color={focused ? "black":"grey"}
          />
        )}
        {name === "Profile" && (
          <FontAwesome
            name="user"
            size={24}
            color={focused ? "black":"grey"}
          />
        )}
      </View>
      {/* <Text
        className={clsx(
          "text-xs",
          focused ? "text-[#9d4edd]" : "text-[#999999]",
          focused ? "font-psemi" : "font-pregular"
        )}
      >
        {name}
      </Text> */}
    </View>
  );
};
