import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { BeveledCornerSquare } from "./BeveledCornerSquare";
import { Content } from "./Content";

const ProductItem = (props: any) => {
 // console.log(props, "props in productItem");
  return (
 <View style={styles.container}>
      <BeveledCornerSquare
        bevelSize={72}
        backgroundColor="white"
        borderColor="grey"
        borderWidth={1}
      >
        <Content {...props} />
      </BeveledCornerSquare>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default ProductItem;
