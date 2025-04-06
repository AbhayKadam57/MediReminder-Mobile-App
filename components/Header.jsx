import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../service/Storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";

const Header = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const GetUserDetails = async () => {
    try {
      const userDetails = await getLocalStorage("userDetails");

      console.log(userDetails);

      setUser(userDetails);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetUserDetails();
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image
          source={require("./../assets/images/smiley.png")}
          style={{ height: 40, width: 40 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Hello {`${user?.displayName}`}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>👋</Text>
      </View>

      <TouchableOpacity onPress={() => router.push("/add-new-medication")}>
        <Ionicons
          style={{ color: Colors.PRIMARY }}
          name="medkit-outline"
          size={30}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
