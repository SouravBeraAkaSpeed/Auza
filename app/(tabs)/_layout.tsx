import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>

      <Tabs.Screen
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
      />

      <Tabs.Screen
        name="ai"
        options={{
          title: 'Ai',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'images-sharp' : 'images-sharp'} color={color} />
          ),
        }}
      />


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
  );
}
