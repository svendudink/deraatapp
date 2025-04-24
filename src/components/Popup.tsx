import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LittleSquare } from './LittleSquare';

const Popup = ({ modalVisible, setModalVisible }) => {
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
          
          {/* Header with a title */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Product Availability Status</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.statusRow}>
            <LittleSquare color="green" />
            <Text style={styles.statusText}>Article is available</Text>
          </View>

          <View style={styles.statusRow}>
            <LittleSquare color="orange" />
            <Text style={styles.statusText}>Article is limited available</Text>
          </View>

          <View style={styles.statusRow}>
            <LittleSquare color="red" />
            <Text style={styles.statusText}>Not available, inquire about the delivery time</Text>
          </View>

          <View style={styles.statusRow}>
            <LittleSquare color="grey" />
            <Text style={styles.statusText}>No Stock info available for this product</Text>
          </View>

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  modalView: {
    width: '80%', // Take up 80% of the screen width
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start', // Align content to the start (left)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end', // Align the close button to the right
    marginBottom: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // Align self to the start of the cross axis
    marginVertical: 4,
  },
  statusText: {
    marginLeft: 10, // Adjust the space between the square and the text
    fontSize: 16, // Adjust the text size as needed
  },
    header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15, // Add space between header and content
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1, // Allows the title to take up space for alignment
  },
});

export default Popup;
