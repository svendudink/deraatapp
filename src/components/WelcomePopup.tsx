import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FilteredSafesContext from '../providers/SafeContext';
import { WELCOME_SEEN_KEY, AUTO_UPDATE_KEY } from '../constants/storageKeys';

interface Props {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
}

const WelcomePopup: React.FC<Props> = ({ modalVisible, setModalVisible }) => {
  const { setSettings } = useContext(FilteredSafesContext);
  const { t } = useTranslation();

  const [autoUpdateChecked, setAutoUpdateChecked] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(AUTO_UPDATE_KEY);
      setAutoUpdateChecked(stored === 'true');
    })();
  }, []);

  const handleProceed = async () => {
    await AsyncStorage.multiSet([
      [AUTO_UPDATE_KEY, 'true'],
      [WELCOME_SEEN_KEY, 'true'],
    ]);

    setSettings(prev => ({ ...prev, autoUpdate: true }));
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Welcome to De Raat App</Text>
            </View>

            <Text style={styles.contentText}>
              To ensure you have the latest safes, occasional background updates may be needed.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleProceed}>
                <Text style={styles.textStyle}>{t?.('yesProceed') ?? 'Yes, Proceed'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '80%',
  },
  scrollView: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contentText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomePopup;
