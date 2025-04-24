import { View, StyleSheet } from "react-native";

export const LittleSquare = ({ color }) => { 
  return (
    <View style={[styles.stockIndicator, { backgroundColor: color }]} />
  );
}

const styles = StyleSheet.create({
  stockIndicator: {
    width: 15,  // Set the square size
    height: 15,
    marginTop: 6,  // Provide some spacing around the square if needed
    // Add any additional styling such as border here
  },
});
