import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Platform } from 'react-native';

// ...





const imagePaths = {
  fire: require("../assets/fire.png"),
  burglary: require("../assets/burglary.png"),
//   weight: require("../assets/weight.png"), // assuming you have a 'weight.png' for the 'weight' case
};

type FireAndBurglaryLogoProps = {
  image: 'fire' | 'burglary' | 'weight';
  value: string;
    totalLength: number
  

};




const FireAndBurglaryLogo: React.FC<FireAndBurglaryLogoProps> = ({ image, value, totalLength }) => {
  // Lookup the image path based on the 'image' prop
  const shield = imagePaths[image];

const smallIcon = totalLength >= 5 ? true : false
  

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={shield} 
        style={styles.image}
        imageStyle={styles.logo}
      >
        <Text style={[styles.text, {top: image === "fire" ? "14%" : "18%",color: image === "fire" ? '#F53416' : '#4EA41E'}]}>{value}</Text>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // Set the dimensions of the container if necessary, for example:
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // If the image is supposed to cover the container:
    width: '100%',
    height: '100%',
    // The resizeMode should be 'cover' if you want the image to cover the whole area of the container
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // Any specific styles you want to apply to just the image itself, not its children
  },
  text: {
    color: '#F53416',
      fontSize: 7,
     fontWeight: Platform.OS === 'ios' ? '900' : '600', // Use numeric weight for iOS and 'bold' for Android
    
    textAlign: 'center',
    // Make sure these are commented out or removed so the text is centered by flexbox
    // position: 'absolute',
    top: "15%"
    // left: '50%',
    // transform: [{ translateX: -50 }, { translateY: -50 }],
  },
});

export default FireAndBurglaryLogo;
