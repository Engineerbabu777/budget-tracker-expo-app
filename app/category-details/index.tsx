import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const CategoryDetails = () => {
  const { categoryId } = useLocalSearchParams();
  return (
    <View>
      <Text>CategoryDetails</Text>
    </View>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({});
