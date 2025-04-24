import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@react-native-vector-icons/ant-design';
// Make sure to install react-native-vector-icons
import { useTranslation } from "react-i18next";



export const Footer_1 = ({ }) => {
     const { t } = useTranslation();
  // Helper function to render each item with different styles for the first word
  const renderFooterItem = (firstWord, restOfText, color) => (
    <View style={styles.item}>
      <AntDesign name="check" size={24} color="#4CAF50" />
      <Text style={styles.text}>
        <Text style={[styles.firstWord, { color }]}>{firstWord} </Text>
        <Text>{restOfText}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.footerContainer}>
 <View style={styles.row}>
                {renderFooterItem(t("footer_1.large"), t("footer_1.supply"), '#1871a9')}
                {renderFooterItem(t("footer_1.customizable"), '', '#f18715')}
            </View>
            <View style={styles.row}>
                {renderFooterItem(t("footer_1.security"), t("footer_1.inyoursafety"), '#f18715')}
                {renderFooterItem(t("footer_1.businessandconsumer"), t("footer_1.solutions"), '#1871a9')}
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
        borderTopWidth: 0.6,
        borderTopColor: '#C8C8C8', 
        justifyContent: 'center',  // This will horizontally center-align the socialContainer within the footer.
      alignItems: 'center',  // This will vertically center-align the socialContainer within the footer.
        backgroundColor: "#FFFFFF",
    },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 0, // Adjust margin to prevent overlapping
    flex: 1, // This will make each item take equal space
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    marginLeft: 5,
    color: '#000', // Default text color
      fontSize: 14, // Set the text size
      fontFamily: "Catamaran-Regular",
    fontWeight: "600"
  },
  firstWord: {
    fontWeight: '900',
  },
});
