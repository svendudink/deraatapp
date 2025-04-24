import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HTML from "react-native-render-html";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";

export const BurglaryResistance_4 = (description) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const htmlColorChange = (color, object) => {
    return `<div style="color: ${color}">${object}</div>`;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {t("burglaryResistanceTitle")}
      </Text>
      <HTML
        source={{
          html: htmlColorChange(
            "black",
          description.foundObject
          ),
        }}
        style={styles.description}
        contentWidth={width}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});
