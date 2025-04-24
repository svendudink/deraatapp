import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import FilteredSafesContext from "../../providers/SafeContext";
import { UkStore } from "../../providers/SafeContext";




export const StorePicker = () => {
  const { t } = useTranslation();
  const {
    settings,
    setSettings
  } = useContext(FilteredSafesContext);

  const changeStore = (newStore) => {
   setSettings((prevSettings) => ({
  ...prevSettings,
  store: newStore
   }));
    
  };


  return (
    <View>
    
        <Text style={styles.label}>{t("settings.store")}</Text>
        <Picker
          selectedValue={settings.store}
          style={styles.languagePicker}
          onValueChange={changeStore}
        >
          <Picker.Item label="UK" value="UK" />
        <Picker.Item label="EU" value="EU" />
        </Picker>
      </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 8,
  },

  languagePicker: {
    marginBottom: 24,
  }
});
