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
import { auth } from "../../config/FirebaseConfig.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const OnCreateAccount = () => {
    if (!email || !password || !userName) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.BOTTOM);
      Alert.alert(
        "Empty Fields",
        "Please fill all fields",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;

        await updateProfile(user, { displayName: userName });
        console.log(user);
        router.push("(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email alreay exists", ToastAndroid.BOTTOM);
          Alert.alert(
            "Email already exists",
            "Please use another email",
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
      <Text style={styles.textHeader}>Create New Account</Text>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <Text>Full Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          onChangeText={(value) => setUserName(value)}
        />
      </View>
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
      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Create Account
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
          onPress={() => router.push("login/signIn")}
        >
          Already account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
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
