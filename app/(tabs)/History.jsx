import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constant/Colors";
import { GetPreviousDateRangeToDisplay } from "../../service/formatDateTime";
import { getLocalStorage } from "../../service/Storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import MedicationCardItem from "../../components/MedicationCardItem";
import EmptyState from "../../components/EmptyState";
import moment from "moment";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().subtract(1, "days").format("MM/DD/YYYY")
  );
  const [dateRange, setDateRange] = useState([]);
  const [loading, setLoading] = useState([]);
  const [medList, setMedList] = useState([]);

  const GetPreviousDates = () => {
    const dates = GetPreviousDateRangeToDisplay();

    setDateRange(dates);
  };

  useEffect(() => {
    GetPreviousDates();
    GetMedicationList(selectedDate);
  }, [selectedDate]);

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

  return (
    <FlatList
      data={[]}
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
      ListHeaderComponent={
        <View style={styles.mainContainer}>
          <Image
            style={styles.imgContainer}
            source={require("./../../assets/images/med-history.png")}
          />
          <Text style={styles.headerText}>Medication History</Text>

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
                  <MedicationCardItem
                    medicine={item}
                    selectedDate={selectedDate}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: Colors.LIGHT_GRAY_BORDER,
                marginTop: 15,
                textAlign: "center",
              }}
            >
              No Medication Found
            </Text>
          )}
        </View>
      }
    />
  );
};

export default History;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: "white",
  },
  imgContainer: {
    width: "100%",
    height: 250,
    borderRadus: 15,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
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
