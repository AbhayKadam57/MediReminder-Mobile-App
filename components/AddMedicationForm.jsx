import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constant/Colors";
import { TypeList, WhenToTake } from "./../constant/Options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  formatAddDateRange,
  formatDate,
  formatDateText,
  formatTime,
} from "../service/formatDateTime";
import { doc, setDoc } from "firebase/firestore";
import { getLocalStorage } from "../service/Storage";
import { db } from "../config/FirebaseConfig";
import { useRouter } from "expo-router";

const AddMedicationForm = () => {
  const [formData, setFormData] = useState({});
  const [showStartDateTimePicker, setShowStartDateTimePicker] = useState(false);
  const [showStartEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showRemiderTime, setShowReminderTime] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMedication = async () => {
    if (
      !formData?.name ||
      !formData?.type ||
      !formData?.dose ||
      !formData?.when ||
      !formData?.startDate ||
      !formData?.endDate ||
      !formData?.reminder
    ) {
      Alert.alert(
        "Empty Fields",
        "Please fill all fields",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    console.log("clicked");
    const docId = Date.now().toString();
    console.log(docId);

    setLoading(true);
    try {
      const userDetails = await getLocalStorage("userDetails");

      const dates = formatAddDateRange(formData?.startDate, formData?.endDate);

      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: userDetails?.email,
        docId: docId,
        dates: dates,
      });

      console.log({
        ...formData,
        userEmail: userDetails?.email,
        docId: docId,
      });
      setLoading(false);
      Alert.alert(
        "Great",
        "New Medication is added successfullly",
        [{ text: "OK", onPress: () => router.push("(tabs)") }],
        { cancelable: false }
      );
    } catch (e) {
      console.log(e);
      setLoading(false);
      Alert.alert(
        "Submission error",
        "Something went wrong",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.InputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          onChangeText={(value) => onHandleInputChange("name", value)}
          style={styles.textInput}
          placeholder="Medicine Name"
        />
      </View>

      <FlatList
        data={TypeList}
        horizontal
        style={{
          marginTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onHandleInputChange("type", item)}
            style={[
              styles.InputGroup,
              { marginRight: 10 },

              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.InputGroup}>
        <Ionicons
          name="eyedrop-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          onChangeText={(value) => onHandleInputChange("dose", value)}
          style={styles.textInput}
          placeholder="Dose Ex. 2, 5ml"
        />
      </View>
      <View style={styles.InputGroup}>
        <Ionicons
          name="time-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
          style={{ width: "90%" }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <View style={styles.dateGroup}>
        <TouchableOpacity
          onPress={() => setShowStartDateTimePicker(true)}
          style={[styles.InputGroup, { flex: 1 }]}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {formatDateText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDateTimePicker && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={new Date(formData?.startDate)}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                formatDate(event.nativeEvent.timestamp)
              );
              setShowStartDateTimePicker(false);
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowEndTimePicker(true)}
          style={[styles.InputGroup, { flex: 1 }]}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {formatDateText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>

        {showStartEndTimePicker && (
          <RNDateTimePicker
            minimumDate={new Date()}
            value={new Date(formData?.endDate)}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                formatDate(event.nativeEvent.timestamp)
              );
              setShowEndTimePicker(false);
            }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setShowReminderTime(true)}
        style={styles.InputGroup}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.text}>
          {formData?.reminder ?? "Select Reminder Time"}
        </Text>
        {showRemiderTime && (
          <RNDateTimePicker
            value={new Date(formData?.reminder) ?? new Date()}
            mode="time"
            onChange={(e) => {
              onHandleInputChange(
                "reminder",
                formatTime(e.nativeEvent.timestamp)
              );
              setShowReminderTime(false);
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={saveMedication}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttonTextStyle}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationForm;

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },

  InputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    padding: 5,
    marginTop: 1,
  },
  dateGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    marginTop: 25,
  },
  buttonTextStyle: {
    textAlign: "center",
    fontSize: 17,
    color: "white",
  },
});
