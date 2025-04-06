import { View, Text, TouchableOpacity, Button, FlatList } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { removeLocalStorage } from "../../service/Storage";
import Header from "../../components/Header";
import EmptyState from "../../components/EmptyState";
import MedicationList from "../../components/MedicationList";

const index = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Ensure sign-out is complete
      await removeLocalStorage("userDetails"); // Remove user details from storage

      router.replace("/login"); // Redirect to login screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: "white",
            height: "100%",
          }}
        >
          <Header />
          <MedicationList />
          {/* <Button title="LOgout" onPress={handleSignOut} /> */}
        </View>
      }
    />
  );
};

export default index;
