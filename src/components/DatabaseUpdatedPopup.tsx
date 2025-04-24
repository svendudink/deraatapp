import React, { useState, useEffect,useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';



export const DatabaseUpdatedPopup = ({popup, setPopup}) => {
  const [popup, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial value for opacity: 0

  useEffect(() => {
    if (popup) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();

      setTimeout(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }
        ).start(() => setPopup(false));
      }, 2000); // Duration of the popup popup
    }
  }, [popup]);



    
  return (
    popup && (
      <Animated.View                 // Special animatable View
        style={{
          ...styles.popup,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}>
        <Text>Database Updated</Text>
      </Animated.View>
    )
  );
};


const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 50, // Adjust according to your needs
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
});

