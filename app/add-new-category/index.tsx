import ColorPicker from "@/components/COlorPicker";
import Colors from "@/utils/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("😊");
  const [selectedColor, setSelectedColor] = useState("red");
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState(0);

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

      {/* Category Name */}
      <View style={styles.inputGroup}>
        <MaterialIcons
          name="local-offer"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="Category name"
          style={styles.input}
          onChangeText={(text: string) => setCategoryName(text)}
        />
      </View>

      {/* Total Budget! */}
      <View style={styles.inputGroup}>
        <FontAwesome6
          name="dollar"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="Total Budget"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(num: string) => setBudget(Number(num))}
        />
      </View>

      {/* Button to Create */}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.Primary,
          padding: 15,
          borderRadius: 10,
          width: "100%",
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: Colors.White, fontWeight: "bold", fontSize: 16 }}>
          Create
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 25,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Black,
    marginTop: 10,
    backgroundColor: "white",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    color: Colors.DarkGray,
    borderRightWidth: 1,
    paddingRight: 10,
    borderColor: Colors.Gray,
  },
});
