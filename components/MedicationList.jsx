import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GetDateRangeToDisplay } from "../service/formatDateTime";
import Colors from "../constant/Colors";
import moment from "moment";
import { getLocalStorage } from "../service/Storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import MedicationCardItem from "./MedicationCardItem";
import EmptyState from "../components/EmptyState";
import { useRouter } from "expo-router";

const MedicationList = () => {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  };

  const GetMedicationList = async (selectedDate) => {
    setLoading(true);
    try {
      const user = await getLocalStorage("userDetails");

      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedDate)
      );

      const querySnapShot = await getDocs(q);
      setMedList([]);

      querySnapShot?.forEach((doc) => {
        console.log(doc.id, "==>", doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);
  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require("./../assets/images/medication.jpeg")}
        style={{ width: "100%", height: 200, borderRadius: 15 }}
      />
      <FlatList
        style={{ marginTop: 15 }}
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(item.formattedDate);
              GetMedicationList(item.formattedDate);
            }}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formattedDate === selectedDate
                    ? Colors.PRIMARY
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
          >
            <Text
              style={[
                styles.date,
                {
                  color:
                    item.formattedDate === selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.date}
            </Text>
            <Text
              style={[
                styles.day,
                {
                  color:
                    item.formattedDate === selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
          </TouchableOpacity>
        )}
      />
      {medList?.length > 0 ? (
        <FlatList
          onRefresh={() => GetMedicationList(selectedDate)}
          refreshing={loading}
          data={medList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/action-modal",
                  params: { ...item, selectedDate: selectedDate },
                })
              }
            >
              <MedicationCardItem medicine={item} selectedDate={selectedDate} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
