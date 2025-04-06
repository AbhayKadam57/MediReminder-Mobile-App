import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "40",
        }}
      >
        <Image
          source={require("./../../assets/images/login.png")}
          style={styles.image}
        />
      </View>
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Stay on Track,Stay Healty
        </Text>
        <Text
          style={{
            fontSize: 17,
            marginTop: 20,
            color: "white",
            textAlign: "center",
          }}
        >
          Track your meds, take control of your health. Stay consistet, stay
          confident
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("login/signIn")}
        >
          <Text
            style={{
              fontSize: 16,
              color: Colors.PRIMARY,
              textAlign: "center",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            marginTop: 5,
            color: "white",
          }}
        >
          Note: By clicking continue, you will agree to our terms and condition
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: { width: 210, height: 450, borderRadius: 23 },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 99,
    marginTop: 25,
  },
});
