import { getLocalStorage } from "@/utils/services";
import { supabase } from "@/utils/SupabseConfig";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

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
    <View>
      <Text>Home</Text>
    </View>
  );
}
