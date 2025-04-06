import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import MedicationCardItem from "../../components/MedicationCardItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import moment from "moment";

const MedicationActionModal = () => {
  const medicine = useLocalSearchParams();

  const router = useRouter();

  const UpadteUserAction = async (status) => {
    try {
      const docRef = doc(db, "medication", medicine.docId);

      const UpdatedDoc = await updateDoc(docRef, {
        actions: arrayUnion({
          status: status,
          time: moment().format("LT"),
          date: medicine?.selectedDate,
        }),
      });

      Alert.alert("Status", "Response Saved", [
        { text: "Ok", onPress: () => router.replace("(tabs)") },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/images/notification.gif")}
        style={{ height: 120, width: 120 }}
      />
      <Text style={{ fontSize: 18 }}>{medicine.selectedDate}</Text>
      <Text style={{ fontSize: 38, fontWeight: "bold", color: Colors.PRIMARY }}>
        {medicine.reminder}
      </Text>
      <Text style={{ fontSize: 18 }}>It's Time To Take Medicine</Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => UpadteUserAction("Missed")}
        >
          <Ionicons name="close" size={24} color="red" />
          <Text
            style={{
              fontSize: 18,
              color: "red",
            }}
          >
            Missed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.successButton}
          onPress={() => UpadteUserAction("Taken")}
        >
          <Ionicons name="checkmark-outline" size={24} color="white" />
          <Text
            style={{
              fontSize: 18,
              color: "white",
            }}
          >
            Taken
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          bottom: 25,
        }}
      >
        <Ionicons name="close-circle" size={38} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationActionModal;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },

  btnContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  closeButton: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "red",
  },
  successButton: {
    padding: 10,
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#51C878",
    backgroundColor: "#51C878",
  },
});
