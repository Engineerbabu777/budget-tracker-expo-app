import Colors from "@/utils/Colors";
import { fetchUserProfile } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import {Ionicons} from "@expo/vector-icons";
export default function Header() {
  const [user, setUser] = useState<any>(null);
  const getUserDetails = async () => {
    // Fetch user details and set it to local storage
    const user = await fetchUserProfile();
    setUser(user);
    console.log({ user });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View
      style={{
        padding: 10,
        // backgroundColor: Colors.Primary,
        flexDirection: "row",
        alignItems: "center",
        gap:10,
        display:"flex"
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
      <View style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:"row",
        flex:1
        // width:"80%"
      }}>
        <View>
          <Text style={{ color: Colors.White, fontSize: 16 }}>Welcome,</Text>
          <Text
            style={{ color: Colors.White, fontSize: 20, fontWeight: "bold" }}
          >
            {user?.first_name}
          </Text>
        </View>
        <Ionicons name="notifications" color={"white"} size={32} />
      </View>
    </View>
  );
}
