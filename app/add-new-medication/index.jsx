import { View, Text, ScrollView } from "react-native";
import React from "react";
import AddMedHeader from "../../components/AddMedHeader";
import AddMedicationForm from "../../components/AddMedicationForm";

const AddNewMedication = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ height: 500 }}>
      <AddMedHeader />
      <AddMedicationForm />
    </ScrollView>
  );
};

export default AddNewMedication;
