import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/utils/SupabseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/utils/Colors";
import CategoryItems from "@/components/CategoryItem";

const CategoryDetails = () => {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState<any>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true); // State for loader

  const router = useRouter();

  const calulateProgress = () => {
    if (!category) return 0;

    const totalBudget = category?.assigned_budget;
    const spentBudget = category?.CategoryList?.reduce(
      (sum, item) => sum + item?.cost,
      0
    );

    setTotalCost(spentBudget);

    if (totalBudget === 0) {
      setPercent(0);
    } else {
      setPercent(Math.round((spentBudget / totalBudget) * 100));
    }
  };

  useEffect(() => {
    if (category) {
      calulateProgress();
    }
  }, [percent, totalCost, category]);

  const getCategoryListById = async () => {
    setLoading(true); // Start loading
    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryList(*)")
      .eq("id", categoryId);

    if (error) {
      console.error("Error fetching category:", error);
      setLoading(false); // Stop loading on error
      return;
    }

    setCategory(data[0]);
    setLoading(false); // Stop loading after data is fetched
  };

  useEffect(() => {
    if (!categoryId) return;
    getCategoryListById();
  }, [categoryId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={44} color="black" />
        </Pressable>

        <View>
          <View
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "baseline",
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor: category?.color,
                }}
              >
                {category?.icon}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 10,
              }}
            >
              <Text style={styles.categoryName}>{category?.name}</Text>
              <Text style={styles.categoryItem}>
                {category?.CategoryList?.length} items
              </Text>
            </View>

            <Ionicons name="trash" size={24} color="red" />
          </View>

          {/* Progress bar! */}
          <View style={styles?.amountContainer}>
            <Text style={{ fontFamily: "Outfit-Regular" }}>${totalCost}</Text>
            <Text style={{ fontFamily: "Outfit-Regular" }}>
              Assigned Budget: ${category?.assigned_budget}
            </Text>
          </View>
          <View style={styles.progressBarMainContainer}>
            <View
              style={[styles.progressBarsubcontainer, { width: `${percent}%` }]}
            ></View>
          </View>
        </View>

        {/* Category Items! */}
        <CategoryItems categoryItems={category?.CategoryList} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryItem: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
  categoryName: {
    fontFamily: "Outfit-Bold",
    fontSize: 24,
  },
  amountContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
  },
  progressBarMainContainer: {
    width: "100%",
    height: 15,
    backgroundColor: Colors.Gray,
    borderRadius: 99,
    marginTop: 7,
  },
  progressBarsubcontainer: {
    borderRadius: 99,
    backgroundColor: Colors.Primary,
    height: 15,
  },
});