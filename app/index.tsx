import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/services";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await getLocalStorage("login");


      if (!response) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // No need to render anything since navigation happens before this.
}
