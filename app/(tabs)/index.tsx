import CircularChart from "@/components/CircularChart";
import Header from "@/components/header";
import Colors from "@/utils/Colors";
import { getLocalStorage } from "@/utils/services";
import { supabase } from "@/utils/SupabseConfig";
import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const getAllVategories = async () => {
    const user: any = await getLocalStorage("user-profile-budget-tracker");

    const { data, error } = await supabase
      .from("Category")
      .select("*")
      .eq("created_by", user?.preferred_email);
    console.log(data, error, user);
  };

  useEffect(() => {
    getAllVategories();
  }, []);
  return (
    <SafeAreaView
      style={{
        // backgroundColor: Colors.Primary,
        flex: 1,
      }}
    >
      {/* <StatusBar barStyle={"light-content"}/> */}
      <View
        style={{
          flex: 1,
        }}
      >
        {/* Header! */}
        <Header />

        {/* Chart! */}
        <CircularChart />
      </View>

      <View
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
      </View>
    </SafeAreaView>
  );
}
