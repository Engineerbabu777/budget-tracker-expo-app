import ColorPicker from "@/components/COlorPicker";
import Colors from "@/utils/Colors";
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("😊");
  const [selectedColor, setSelectedColor] = useState("red");

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={(text) => setSelectedIcon(text)}
          style={{
            textAlign: "center",
            fontSize: 50,
            backgroundColor: selectedColor || Colors.Primary,
            // padding: 20,
            paddingHorizontal: 28,
            height: 120,
            width: 120,
            borderRadius: 99,
            color: Colors.White,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          maxLength={2}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
        />
      </View>

      
    </SafeAreaView>
  );
}
