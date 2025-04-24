import React from 'react';
import { View, StyleSheet } from 'react-native';

export const EmptyFooter = () => {
  return (
    <View style={styles.footerContainer}></View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    height: 20, // approximately 2mm
    backgroundColor: "#FFFFFF", // Assuming you want a white background
  },
});
