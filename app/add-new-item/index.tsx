import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/utils/Colors";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/utils/SupabseConfig";
import { useLocalSearchParams } from "expo-router";

const imagePlaceholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVva9csN-zOiY2wG9CXNuAI1VRsFunaiD3nQ&s";
const index = () => {
  const [image, setImage] = useState<null | string | undefined>(null);
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(imagePlaceholder);

  const { categoryId } = useLocalSearchParams();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      //   aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].base64);
      setImagePreview(result.assets[0].uri);
    }
  };

  const handleAdd = async () => {
    try {
      const fileName = Date.now();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("budget")
        .upload(`${fileName}.png`, decode(image!), {
          contentType: "image/*",
        });

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        return;
      }

      const imageUrl =
        "https://bfmqgwgdwwpkvvzoetkg.supabase.co/storage/v1/object/public/budget/" +
        uploadData?.path;

      const { data, error: insertError } = await supabase
        .from("CategoryList")
        .insert({
          name: itemName,
          url: imageUrl, // Use the uploaded image URL
          cost: Number(cost),
          note: note,
          category_id: categoryId,
        });

      if (insertError) {
        console.error("Error inserting data:", insertError);
        Alert.alert("Data inserted Failed!");
        return;
      }

      Alert.alert("Data inserted successfully!");

      console.log("Data inserted successfully:", data);
    } catch (err) {
      Alert.alert("Data inserted Failed!");
      console.error("An unexpected error occurred:", err);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Pressable onPress={pickImage}>
              <Image
                source={{ uri: imagePreview }}
                style={styles.imageStyles}
              />
            </Pressable>

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
                onChangeText={(text: string) => setItemName(text)}
                value={itemName}
              />
            </View>

            <View style={styles.inputGroup}>
              <FontAwesome6
                name="dollar"
                size={24}
                color="black"
                style={styles.icon}
              />
              <TextInput
                placeholder="Cost"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={(text: string) => setCost(text)}
                value={cost}
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons
                name="link"
                size={24}
                color="black"
                style={styles.icon}
              />

              <TextInput
                placeholder="Url"
                style={styles.input}
                onChangeText={(text: string) => setUrl(text)}
                value={url}
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons
                name="pencil"
                size={24}
                color="black"
                style={styles.icon}
              />
              <TextInput
                placeholder="Note"
                style={styles.input}
                onChangeText={(text: string) => setNote(text)}
                value={note}
                numberOfLines={3}
              />
            </View>

            {/* Button to Add */}
            <TouchableOpacity
              onPress={handleAdd}
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
              disabled={!cost || !url || !itemName}
            >
              <Text
                style={{
                  color: Colors.White,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  imageStyles: {
    width: 150,
    height: 150,
    borderRadius: 15,
    backgroundColor: Colors.Gray,
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
    color: Colors.Gray,
    borderRightWidth: 1,
    paddingRight: 10,
    borderColor: Colors.Gray,
  },
});
