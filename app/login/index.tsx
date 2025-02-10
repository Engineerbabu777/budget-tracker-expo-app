import Colors from "@/utils/Colors";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@/assets/images/login.png")}
          style={{
            width: 200,
            height: 400,
            borderRadius: 15,
            marginTop: 40,
            borderWidth: 5,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: Colors.Primary,
          width: "100%",
          height: "100%",
          marginTop: -20,
          padding: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            textAlign: "center",
            color: Colors.White,
          }}
        >
          Personal Budget Planner
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: Colors.White,
            marginTop: 20,
          }}
        >
          Stay on Track. Event By Event:Your Personal Budget Planner App!
        </Text>

        <TouchableOpacity
        style={{
            backgroundColor:'white',
            borderRadius:50,
            marginTop:30,
            padding:15
        }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.DarkGray,
              textAlign: "center",
            }}
          >
            Login/Signup
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
