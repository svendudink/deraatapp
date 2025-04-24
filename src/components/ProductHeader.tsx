import React from 'react';
import { StyleSheet, Dimensions,Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header } from 'react-native-elements';
import FilteredSafesContext from '../providers/SafeContext';
import { useContext } from 'react';


export const ProductHeader = ({ text }) => {
  const {appStaging} = useContext(FilteredSafesContext)
  const { t } = useTranslation();


  return (
    <Header
      centerComponent={{
        text: text,
        style: styles.centerComponentStyle,
      }}
      backgroundImage={!appStaging ? require("../assets/backGroundWideOptimized.png") : require("../assets/backGroundWideOrange.png")}
      backgroundImageStyle={styles.backgroundImageStyle}
      containerStyle={styles.containerStyle}
    />
  );
};



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let smallDeviceCorrection = 0
if (windowHeight <= 667) {
smallDeviceCorrection = -23
}


const styles = StyleSheet.create({
  centerComponentStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute', // Position the text absolutely
    //top: Platform.OS === 'android' ? -20 : -110, // Adjust top position as needed
    left: "-60%",
    transform: [{ translateY: Platform.OS === 'android' ? -37 : -30 }],
    right: 0,
    textAlign: 'center', // Center the text horizontally
    // No need for alignSelf when using absolute positioning
  },
  backgroundImageStyle: {
    // Assuming the image has been optimized to fit well as a header without needing to stretch,
    // set width to '100%' to cover the container's width
    width: '100%', 
    height: '100%', // Set height to '100%' to ensure the image's full height is used
  },
  containerStyle: {
    height:  50, // Adjust this to the height of your header
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
  
  },
});


