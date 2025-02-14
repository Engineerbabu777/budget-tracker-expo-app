import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/utils/Colors";

export default function CategoryList({ categoryList }: { categoryList: any }) {
  return (
    <View
      style={{
        marginTop: 20,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontFamily: "Outfit-Bold",
          marginBottom:20
        }}
      >
        Latest Budget
      </Text>

      <View>
        {categoryList?.map((category: any, index: number) => {
          return (
            <View key={index} style={styles.container}>
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.iconStyle,
                    { backgroundColor: category.color },
                  ]}
                >
                  {category.icon}
                </Text>
              </View>

              <View style={{
                display:"flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "70%",
                flexDirection: "row",
                
               }}>
                <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <Text style={styles.itemCount}>
                    {category?.CategoryList?.length} Items
                  </Text>
                </View>
                <View>

                <Text style={{
                  fontSize: 17,
                  fontFamily: "Outfit-Bold",
 
                }}>$5000</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 35,
    padding: 16,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  container: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor:Colors.White,
    padding: 10,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 20,
    fontFamily: "Outfit-Bold",
  },
  itemCount: {
    fontFamily: "Outfit-Regular",
  },
});
