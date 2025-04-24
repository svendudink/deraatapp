import React, { useContext } from "react";
import { Picker } from "@react-native-picker/picker"
import { StyleSheet, View, Text } from "react-native"
import { useTranslation } from "react-i18next";
import FilteredSafesContext from "../../providers/SafeContext";


export const LanguagePicker = () => { 
    const { t,i18n } = useTranslation();

      const {
    language,
    setLanguage,
  } = useContext(FilteredSafesContext);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

    return (<View>
         <Text style={styles.label}>{t("settings.language")}</Text>
        <Picker
          selectedValue={language}
          style={styles.languagePicker}
          onValueChange={changeLanguage}
        >
        <Picker.Item label="English" value="en" />
          <Picker.Item label="Nederlands" value="nl" />
          <Picker.Item label="Français" value="fr" />
        </Picker></View>)
}

const styles = StyleSheet.create({
    languagePicker: {
        marginBottom: 24,
    },  label: {
    fontSize: 18,
    marginBottom: 8,
  },
})