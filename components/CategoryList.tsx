import { View, Text, StyleSheet } from "react-native";
import React from "react";

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
          fontSize: 20,
          fontFamily: "Outfit-Bold",
        }}
      >
        Latest Budget
      </Text>


      <View style={{marginTop:-70}}>
        {categoryList?.map((category: any,index:number) => {
          return (
            <View key={index} style={styles.container}>
              <View style={styles.iconContainer}>
                <Text style={[styles.iconStyle,{backgroundColor:category.color}]}>{category.icon}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle:{
   fontSize:35,
   padding:16,
   borderRadius:15
  },
  iconContainer:{
   justifyContent:"center",
   alignItems:"baseline"
  },
  container:{
    marginBottom:20
  }
})