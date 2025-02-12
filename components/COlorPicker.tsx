import Colors from "@/utils/Colors";
import React from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  setSelectedColor: any;
  selectedColor: string;
};
export default function ColorPicker({
  selectedColor,
  setSelectedColor,
}: Props) {
  return (
    <View
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {Colors.Colors.map((color, index) => {
        return (
          <Pressable
            onPress={() => setSelectedColor(color)}
            key={index}
            style={{
              borderWidth: 1,
              borderColor: selectedColor === color ? Colors.White : Colors.Black,
              backgroundColor: color,
              width: 40,
              height: 40,
              margin: 5,
              borderRadius: 99,
              marginTop: 10,
            }}
          ></Pressable>
        );
      })}
    </View>
  );
}
