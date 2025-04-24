import { ActivityIndicator, StyleSheet, Text, View } from "react-native";



export const LoadingSpinner = ({ loadState }: any) => { 
    




    return (<View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#36D7B7" />
        <Text>{loadState}</Text>
      </View>)
}



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});