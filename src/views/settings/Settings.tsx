import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { ProductHeader } from "../../components/ProductHeader";
import { LanguagePicker } from "./LanguagePicker";
import { StorePicker } from "./StorePicker";


export const Settings = () => {
  const { t} = useTranslation();
  
  return (
    <View>
      <ProductHeader text={t("settings.title")} />
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
           <LanguagePicker />
          <StorePicker />    
      </View>
    </ScrollView></View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
});
