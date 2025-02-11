import { getLocalStorage } from "@/utils/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const checkUser = async () => {
    // check if user is logged in
    const response = await getLocalStorage("login");
    if (!response) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Page</Text>
    </View>
  );
}

