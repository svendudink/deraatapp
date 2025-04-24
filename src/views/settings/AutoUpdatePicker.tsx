import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import FilteredSafesContext from "../../providers/SafeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSyncConnection} from '../../hooks/useSyncConnection';




export const AutoUpdatePicker =  () => {

  const {isConnected, reconnect, disconnect} = useSyncConnection();
  const { t } = useTranslation();
  const {
    settings,
    setSettings
  } = useContext(FilteredSafesContext);

  const changeUpdate = async (boolean) => {
    if(boolean) {
      reconnect()
    } else {   
disconnect()
    }
    AsyncStorage.setItem('@autoUpdate',String(boolean))
   setSettings((prevSettings) => ({
  ...prevSettings,
  autoUpdate: boolean
   }));
    
  };



  return (
    <View>
    
        <Text style={styles.label}>{t("settings.autoUpdate")}</Text>
        <Picker
          selectedValue={settings.autoUpdate}
          style={styles.languagePicker}
          onValueChange={changeUpdate}
        >
        <Picker.Item label={t("onRecommended")} value={true} />
          <Picker.Item label={t("OffOffline")} value={false} />
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
