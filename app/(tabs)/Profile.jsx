import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constant/Colors";
import { getLocalStorage, removeLocalStorage } from "../../service/Storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "./../../config/FirebaseConfig";

const buttonData = [
  {
    id: 0,
    name: "Add New Medication",
    path: "/add-new-medication",
    iconComponent: FontAwesome,
    iconName: "plus",
  },
  {
    id: 1,
    name: "My Medication",
    path: "(tabs)",
    iconComponent: Ionicons,
    iconName: "medkit",
  },
  {
    id: 2,
    name: "History",
    path: "/History",
    iconComponent: FontAwesome,
    iconName: "history",
  },
  {
    id: 3,
    name: "Logout",
    path: "/",
    iconComponent: MaterialIcons,
    iconName: "logout",
  },
];

const Profile = () => {
  const [user, setUser] = useState({});

  const router = useRouter();

  const GetUserDetails = async () => {
    try {
      const user = await getLocalStorage("userDetails");

      setUser(user);

      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetUserDetails();
  }, []);

  const SignOut = async () => {
    try {
      await signOut(auth);
      await removeLocalStorage();

      router.replace("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      <View style={styles.profileContainer}>
        <Image
          source={require("./../../assets/images/smiley.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {user?.displayName}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "medium",
            color: Colors.GRAY,
          }}
        >
          {user?.email}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        {buttonData?.map((item, index) => {
          const Icon = item.iconComponent;
          return (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                item.name === "Logout" ? SignOut() : router.push(item.path)
              }
            >
              <Icon
                style={{
                  padding: 12,
                  backgroundColor: Colors.LIGHT_PRIMARY,
                  borderRadius: 4,
                }}
                name={item.iconName}
                size={28}
                color={Colors.PRIMARY}
              />
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "white",
    height: "100%",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },

  profileContainer: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    marginTop: 30,
    gap: 6,
  },
  buttonGroup: {
    marginTo: 30,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
  },
});
