import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/utils/SupabseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/utils/Colors";
import CategoryItems from "@/components/CategoryItem";
import { AntDesign } from "@expo/vector-icons";

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

  const handleDeleteCategory = async () => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteCategory(),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteCategory = async () => {
    const { error } = await supabase
      .from("Category")
      .delete()
      .eq("id", categoryId);

    if (error) {
      console.error("Error deleting category:", error);
      return;
    }

    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 10,
          display: "flex",
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

            <Pressable onPress={handleDeleteCategory}>
              <Ionicons name="trash" size={24} color="red" />
            </Pressable>
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
      <View style={{}}>
        <Pressable
          onPress={() => router.push("/add-new-item")}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            borderRadius: 99,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <AntDesign name="pluscircle" size={54} color={Colors.Primary} />
        </Pressable>
      </View>
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
