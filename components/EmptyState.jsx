import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ConstantString from "../constant/ConstantString";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";

const EmptyState = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 80, display: "flex", alignItems: "center" }}>
      <Image
        source={require("./../assets/images/medicine.png")}
        style={{ width: 120, height: 120 }}
      />

      <Text style={{ marginTop: 30, fontSize: 35, fontWeight: "bold" }}>
        {ConstantString.NoMedication}
      </Text>
      <Text
        style={{
          marginTop: 20,
          fontSize: 15,
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        {ConstantString.MedicationSubText}
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/add-new-medication")}
        style={{
          padding: 15,
          borderRadius: 10,
          backgroundColor: Colors.PRIMARY,
          width: "100%",
          marginTop: 30,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 17 }}>
          {ConstantString.AddNewMediciationBtn}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
