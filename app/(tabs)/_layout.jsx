import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { getLocalStorage } from "../../service/Storage";

const TabLayout = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For handling async loading state

  const GetUserDetails = async (user) => {
    try {
      const userDetails = await getLocalStorage("userDetails");
      if (userDetails) {
        setUser(userDetails);
      } else {
        router.replace("/login");
      }
    } catch (e) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    GetUserDetails();
  }, []);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
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
        name="History"
        options={{
          tabBarLabel: "History1",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
