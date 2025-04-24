import {
  Text,
  View,useWindowDimensions, StyleSheet
} from "react-native";
import HTML from "react-native-render-html";
import { useTranslation } from "react-i18next";

export const Description_2 = (foundObject) => {
    const { t } = useTranslation();
      const { width } = useWindowDimensions();
    
  const htmlColorChange = (color, object) => {
    return `<div style="color: ${color}">${object}</div>`;
  };
    return ( <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("descriptionTitle")}</Text>
            
            <HTML
              source={{
                html: htmlColorChange(
                  "black",
                 foundObject.foundObject
                ),
              }}
              style={styles.description}
              contentWidth={width}
            />
          </View>)
}
const styles = StyleSheet.create({
    description: {
        fontSize: 16,
    },
    section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
})