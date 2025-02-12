import Colors from "@/utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";

export default function CircularChart() {
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.Gray]);
  const widthAndHeight = 150;

  const series = [
    { value: 430, color: Colors.Gray },
  ];

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        Total Estimate: <Text style={{ fontWeight: "bold" }}>0$</Text>
      </Text>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          gap: 40,
        }}
      >
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          cover={0.65}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text>N/A</Text>
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={Colors.Gray}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    elevation: 1,
    backgroundColor: Colors.White,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
  },
});
