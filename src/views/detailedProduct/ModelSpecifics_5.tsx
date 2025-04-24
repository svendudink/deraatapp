import { useQuery } from "@realm/react";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";


export const ModelSpecifics_5 = ({ foundObject }) => { 
  

     const { t } = useTranslation();
    return (
    <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("modelSpecificsTitle")} {foundObject.modelEn}
          </Text>
          <View style={styles.size}>
            <View style={styles.sizeColumn}>
              <Text style={styles.sizeLabel}>{t("innerSizeTitle")}:</Text>
              <Text style={styles.sizeValue}>
                {foundObject.insideDimensionHightInMm}mm x{" "}
                {foundObject.insideDimensionWideInMm}mm x{" "}
                {foundObject.insideDimensionDepthInMm}mm
              </Text>
            </View>
            <View style={styles.sizeColumn}>
              <Text style={styles.sizeLabel}>{t("outerSizeTitle")}:</Text>
              <Text style={styles.sizeValue}>
                {foundObject.outsideDimensionHightInMm}mm x{" "}
                {foundObject.outsideDimensionWideInMm}mm x{" "}
                {foundObject.outsideDimensionDepthInMm}mm
              </Text>
            </View>
          </View>
        </View>
)
}

const styles = StyleSheet.create({
      section: {
    marginBottom: 20,
  },
      sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
     size: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sizeColumn: {
    alignItems: "center",
    flex: 1,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeValue: {
    fontSize: 16,
    lineHeight: 24,
  },
})