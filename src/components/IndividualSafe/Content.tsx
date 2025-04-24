import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native"
import { ChangingImage } from "./ChangingImage";
import FireAndBurglaryLogo from "../FireAndBurglaryLogo";






export const Content = (props) => {


  (async () => {

 console.log(props.item.imageArray, "prohhhe");
            const images = await props.item.imageArray.fetch(); // images will be an array of SafeImageArray models
            console.log(images, "images");

            const imageArray$ = await props.imageArray.observe();
            await imageArray$.subscribe((imageArray) => {
                console.log(imageArray, "imageArray");
            });

   })();
       


  function findSeriesByName(seriesArray, seriesName) {
  return seriesArray.find(item => item.nameSeriesEn === seriesName);
}

const logos = findSeriesByName(props.logoData,props.nameSeries)

  // Not in use right now, but used for showing safe content
  //const htmlContent = `<div style="color: black">${props.description}</div>`;
  

  
return (
    <View style={styles.product}>
      <View style={styles.content}>
        <ChangingImage {...props} />
        <View style={styles.details}>
    <View style={styles.logoContainer}>
  {logos?.allfireresistanceclassifications[0] && logos?.allfireresistanceclassifications.map((grade, index) => {
    if (grade === "") {
      console.log('Empty grade detected in allfireresistanceclassifications:', logos);
    }
    return (
      <FireAndBurglaryLogo key={`fire_${index}`} image={"fire"} value={grade} totalLength={logos?.allfireresistanceclassifications.length} />
    );
  })}
  
  {/* Loop over the alleurosafeeurogrades array and render a logo for each item */}
  
  {logos?.alleurosafeeurogrades[0] && logos?.alleurosafeeurogrades.map((grade, index) => {
    if (grade === "") {
      console.log('Empty grade detected in alleurosafeeurogrades:', logos);
    }
    return (
      <FireAndBurglaryLogo key={`burglary_${index}`} image={"burglary"} value={grade} />
    );
  })}
</View>

          <Text>Series:</Text>
          <Text style={styles.nameSeries}>
            {props.nameSeries}
          </Text>
          {/* Your content here */}
        </View>
      </View>
      <View style={styles.actions}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
   paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logoContainer: {
    flexDirection: 'row', // This will align logos horizontally
    alignItems: 'center', // This will center them vertically within the container
    // Add other styling such as padding or margin as necessary
  },

  product: {
    margin: 20,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  base64Image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  details: {
     flexShrink: 1,
    alignItems: "center",
    padding: 0,
  
   
 
  },
  nameSeries: {
    fontSize: 20,
    marginVertical: 4,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2271A9",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});


