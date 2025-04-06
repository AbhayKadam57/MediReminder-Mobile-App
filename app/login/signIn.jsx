import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { setLocalStorage } from "../../service/Storage";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      Alert.alert(
        "Empty Fields",
        "Please fill all fields",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        await setLocalStorage("userDetails", user);
        // ...
        router.push("(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/invalid-credential") {
          ToastAndroid.show("Invalid credentials", ToastAndroid.BOTTOM);
          Alert.alert(
            "Invalid credentials",
            "Please check your email and password",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!</Text>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("login/signUp")}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "white",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonCreate: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 35,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
