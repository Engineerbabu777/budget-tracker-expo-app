import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/utils/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/SupabseConfig";

const CategoryItems = ({ categoryItems }: { categoryItems: any }) => {
  const router = useRouter();
  const handleDeleteCategoryItem = (item: any) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this Item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const { error } = await supabase
              .from("CategoryList")
              .delete()
              .eq("id", item?.id);

            if (error) {
              console.error("Error deleting category:", error);
              return;
            }

            router.replace({
              pathname: "/category-details",
              params: { categoryId: item.category_id },
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category Items</Text>

      {/* List! */}
      <View style={{ marginTop: 20 }}>
        {categoryItems?.length > 0 ? (
          categoryItems.map((item, index: number) => (
            <React.Fragment key={item.id}>
              <View style={styles.itemContainer}>
                <View>
                  <Image source={{ uri: item.url }} style={styles.image} />
                </View>
                <View style={{ flex: 1, marginLeft: 10, gap: 2 }}>
                  <Text style={{ fontFamily: "Outfit-Bold", fontSize: 20 }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "Outfit-Regular", color: Colors.Gray }}
                    numberOfLines={3}
                  >
                    {item?.url}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Outfit-Bold",
                    fontSize: 17,
                    marginLeft: 10,
                  }}
                >
                  ${item.cost}
                </Text>
              </View>
              <Pressable
                style={{ marginLeft: "auto" }}
                onPress={() => handleDeleteCategoryItem(item)}
              >
                <MaterialIcons name="delete-forever" size={24} color="red" />
              </Pressable>
              {index !== categoryItems.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.Gray,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                ></View>
              )}
            </React.Fragment>
          ))
        ) : (
          <Text style={styles.noItemsText}>No items available</Text>
        )}
      </View>
    </View>
  );
};

export default CategoryItems;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontFamily: "Outfit-bold",
    fontSize: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noItemsText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: Colors.Gray,
    textAlign: "center",
    marginTop: 20,
  },
});
