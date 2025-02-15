import Colors from "@/utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";

export default function CircularChart({ categoryList }: { categoryList: any }) {
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([Colors.Gray]);
  const [series, setSeries] = useState([{ value: 430, color: Colors.Gray }]);
  const [totalEstimate, setTotalEstimate] = useState(0)
  const widthAndHeight = 150;

  useEffect(() => {
    if (categoryList.length > 0) {
      updateCircularChart();
    }
  }, [categoryList]);

  console.log("1", { categoryList });

  const updateCircularChart = () => {
    setSeries([]);
    let total = 0;
    categoryList?.forEach((item, index) => {
      let totalCost = 0;
      let otherCosts = 0;
      if (index > 4) {

        item?.CategoryList?.forEach((item) => {
          otherCosts += item.cost;
          total += item.cost;
        });

        setSeries((series) => [
          ...series,
          { value: otherCosts, color: Colors.Gray },
        ]);
      } else {
        item?.CategoryList?.forEach((item) => {
          totalCost += item.cost;
          total += item.cost;
        });

        setSeries((series) => [
          ...series,
          { value: totalCost, color: Colors.Colors[index] },
        ]);
      }
    });
    setTotalEstimate(total);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        Total Estimate: <Text style={{ fontWeight: "bold" }}>{totalEstimate}$</Text>
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
        {categoryList.length === 0 ? (
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
        ) : (
          <View>
            {categoryList.map((category, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={24}
                  color={index < 4 ? Colors.Colors[index] : Colors.Gray}
                />
                <Text>{index < 4 ? category.name : "Others"}</Text>
              </View>
            ))}
          </View>
        )}
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
