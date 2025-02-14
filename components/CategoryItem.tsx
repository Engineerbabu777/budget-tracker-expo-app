import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/utils/Colors";

const CategoryItems = ({ categoryItems }: { categoryItems: any }) => {
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
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontFamily: "Outfit-Bold", fontSize: 20 }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "Outfit-Regular", color: Colors.Gray }}
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
              {index !== categoryItems.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.Gray,
                    marginTop: 10,
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