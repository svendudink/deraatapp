
import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity, StyleSheet
} from "react-native";
import { StockCheck } from "./stockCheck";


export const SingleProductLine = ({ product,articleNumber, index,setActiveRowArticleNumber,activeRow,setActiveRow }) => {
   
    
    return (
              <TouchableOpacity
               
                style={[
                  styles.otherProduct,
                  index % 2 !== 0 && { backgroundColor: "#f2f2f2" },
                  activeRow === product.articleNumber && {
                    backgroundColor: "#ddefdc",
                  },
                ]}
        onPress={() => {
          setActiveRowArticleNumber(product.articleNumber)
          setActiveRow(product.articleNumber)
                }}
              >
            
                <Text
                  style={[
                    styles.otherProductText,
                    // product.articleNumber === articleNumber &&
                    //   styles.selectedProductText,
                  ]}
                >
                  {product.modelEn}
                </Text>
                <Text
                  style={[
                    styles.otherProductText,
                    product.articleNumber === articleNumber &&
                      styles.selectedProductText,
                  ]}
                >
                  {product.weightInKg}
                </Text>
                <Text
                  style={[
                    styles.otherProductText,
                    product.articleNumber === articleNumber &&
                      styles.selectedProductText,
                  ]}
                >
                  {product.volumeInLiters}
        </Text>
            <View style={{ alignItems: "center", flex: 1 }}>
                  <Text
                    style={[
                      styles.symbolText,
                      product.articleNumber === articleNumber &&
                        styles.selectedProductText,
                    ]}
                  >
                    <StockCheck articleNumber={product.articleNumber} />
                  </Text>
                </View>
              </TouchableOpacity>
            )
}
 
const styles = StyleSheet.create({
     selectedProductText: {
    color: "black",
    }, 
      symbolText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10, // Add some space between the symbol and the product text
    },
        otherProductText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    color: "black",
    },
          otherProduct: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 3,
    paddingHorizontal: 10,
  },
})