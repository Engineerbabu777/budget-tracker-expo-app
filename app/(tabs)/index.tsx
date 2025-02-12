import CircularChart from "@/components/CircularChart";
import Header from "@/components/header";
import Colors from "@/utils/Colors";
import { getLocalStorage } from "@/utils/services";
import { supabase } from "@/utils/SupabseConfig";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        backgroundColor: Colors.Primary,
      }}
    >
      {/* Header! */}
      <Header />

      {/* Chart! */}
      <CircularChart />
    </SafeAreaView>
  );
}
