import React,{useState, useContext} from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilteredSafesContext from "../providers/SafeContext";


const WelcomePopup = ({ modalVisible, setModalVisible,setPermissionToDownload }) => {

  const {
    settings,
    setSettings
  } = useContext(FilteredSafesContext);

  const [autoUpdate, setAutoUpdate] = useState(true);


  const fetchData = async () => {
    try {
        const value = await AsyncStorage.getItem('@autoUpdate');
    } catch (error) {
        // Handle errors here
        console.log('Error retrieving data', error);
    }
};

fetchData();
  
  const { t } = useTranslation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Welcome to De Raat App</Text>
            </View>
  
            <Text style={styles.contentText}>
  To ensure you have the latest safes, the De Raat app requires a one-time download of about 70MB. Occasional background updates may also be needed. Can we proceed with the initial download?
</Text>

  
          
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              setPermissionToDownload(true)
              setModalVisible(!modalVisible)
              AsyncStorage.setItem('@autoUpdate',"true")
              AsyncStorage.setItem('@welcomeScreen',"false")
              setSettings((prevSettings) => ({
                ...prevSettings,
                autoUpdate: true
                 }));
            }}
          >
            <Text style={styles.textStyle}>Yes, Proceed</Text>
          </TouchableOpacity>
{/* 
          <TouchableOpacity
            style={styles.closeButtonBottom}
            onPress={() => {
              setPermissionToDownload(false)
              setModalVisible(!modalVisible)
              AsyncStorage.setItem('@autoUpdate',"false")
              setSettings((prevSettings) => ({
                ...prevSettings,
                autoUpdate: false
                 }));
            }}
              
          >
            <Text style={styles.textStyleBottom}>Not Now</Text>
          </TouchableOpacity> */}
        </View>

      </ScrollView>
    </View>
  </View>
</Modal>

  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    alignSelf: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#333', // Change as needed
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Set a fixed width for the modal
    maxHeight: '80%', // Set a max height for the modal content
  },
  scrollView: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure the header spans the width of the modal
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50', // Green background
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  closeButtonBottom: {
    backgroundColor: '#F44336', // Red background
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'flex-start', // Align section headers to the start
  },
  contentText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'left', // Align text to the left
    alignSelf: 'flex-start', // Align text items to the start
    },
imageStyle: {
  width: 200, // Set a fixed width for the image
  height: 200, // Set a fixed height for the image
  marginTop: 20,
  marginBottom: 20,
    },
  // closeButtonBottom: {
  //   marginTop: 20,
  //   backgroundColor: "#3270AC", // Or any color you want for the button
  
  //   padding: 10,
  //   elevation: 2,
  //   alignSelf: 'center', // Center button horizontally
  // },

  textStyleBottom: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomePopup;
