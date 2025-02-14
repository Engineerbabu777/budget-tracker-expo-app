import CircularChart from "@/components/CircularChart";
import Header from "@/components/header";
import Colors from "@/utils/Colors";
import { getLocalStorage } from "@/utils/services";
import { supabase } from "@/utils/SupabseConfig";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import CategoryList from "@/components/CategoryList";

export default function Home() {
  const router = useRouter();

  const [categoryList, setCategoryList] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<any>(false);

  const getAllCategories = async () => {
    setLoading(true);
    const user: any = await getLocalStorage("user-profile-budget-tracker");

    const { data, error } = await supabase
      .from("Category")
      .select("*,CategoryList(*)")
      .eq("created_by", user?.preferred_email);

    setLoading(false);
    setCategoryList(data);
    console.log(data, error, user);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <SafeAreaView
      style={{
        // backgroundColor: Colors.Primary,
        flex: 1,
      }}
    >
      {/* <StatusBar barStyle={"light-content"}/> */}
      <ScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl onRefresh={getAllCategories} refreshing={loading} />
        }
      >
        {/* Header! */}
        <Header />

        {/* Chart! */}
        <CircularChart />

        {/* Category List! */}
        <CategoryList categoryList={categoryList} />
      </ScrollView>

      <Pressable
        onPress={() => router.push("/add-new-category")}
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
    </SafeAreaView>
  );
}
