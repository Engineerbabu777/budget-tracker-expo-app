import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/utils/Colors";
export default function HomeLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor:Colors.Primary 
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            tabBarLabel: "History",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
