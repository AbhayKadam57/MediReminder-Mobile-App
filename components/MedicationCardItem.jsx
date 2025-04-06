import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const MedicationCardItem = ({ medicine, selectedDate = "" }) => {
  const [status, setStatus] = useState();

  const CheckStatus = () => {
    const status = medicine?.actions?.find(
      (item) => item?.date == selectedDate
    );

    setStatus(status);
  };

  useEffect(() => {
    CheckStatus();
  }, [medicine]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {medicine.name}
          </Text>
          <Text style={{ fontSize: 16 }}>{medicine.when}</Text>
          <Text style={{ color: "white" }}>
            {medicine.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>
      <View style={styles.remiderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontWeight: "bold" }}>{medicine?.reminder}</Text>
      </View>

      {status?.date &&
        (status?.status === "Taken" ? (
          <View style={styles.statusContainer}>
            <Ionicons name="checkmark-circle" size={24} color="#51C878" />
          </View>
        ) : (
          status?.status === "Missed" && (
            <View style={styles.statusContainer}>
              <Ionicons name="close-circle" size={24} color="red" />
            </View>
          )
        ))}
    </View>
  );
};

export default MedicationCardItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: Colors.LIGHT_PRIMARY,
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.LIGHT_GRAY_BORDER,
    borderWidth: 1,
    borderRadius: 15,
  },

  imageContainer: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    marginRight: 8,
  },
  subContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  remiderContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.LIGHT_GRAY_BORDER,
    borderWidth: 1,
    borderRadius: 15,
  },
  statusContainer: {
    position: "absolute",
    top: 5,
    left: 5,
  },
});
