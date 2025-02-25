import Colors from "@/utils/Colors";
import { fetchUserProfile } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getLocalStorage } from "@/utils/services";
export default function Header() {
  const [user, setUser] = useState<any>(null);
  const getUserDetails = async () => {
    // Fetch user details and set it to local storage
    // const user = await fetchUserProfile();
    const user = await getLocalStorage("user-profile-budget-tracker");
    setUser(user);
    console.log({ user });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor: Colors.Primary,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        display: "flex",
        height:150,
        paddingTop:-10,
        paddingBottom:40
        
      }}
    >
      <View>
        <Image
          source={{ uri: user?.picture }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          // width:"80%"
        }}
      >
        <View>
          <Text
            style={{
              color: Colors.White,
              fontSize: 16,
              fontFamily: "Outfit-Regular",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              color: Colors.White,
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Outfit-Bold",
            }}
          >
            {user?.first_name}
          </Text>
        </View>
        <Ionicons name="notifications" color={"white"} size={32} />
      </View>
    </View>
  );
}
