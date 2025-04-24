import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenWidth } from "react-native-elements/dist/helpers";

export const Image_1 = ({foundObject}) => {

  console.log(foundObject, "foundobject in image");
  const [fetchedImages, setFetchedImages] = useState([]);
  const { imageArray } = foundObject;
  console.log(imageArray);

  useEffect(() => {
    const fetchImages = async () => {
      let images;
      if (imageArray && typeof imageArray.fetch === "function") {
        images = await imageArray.fetch();
      } else {
        images = imageArray;
      }
      setFetchedImages(images || []);
    };
    fetchImages();
  }, [imageArray]);

  const imageSources = fetchedImages.reduce((acc, item) => {
    if (item.blob && item.blob !== "none") {
      acc.push({ uri: `data:image/jpeg;base64,${item.blob}` });
    }
    return acc;
  }, []);

  if (imageSources.length === 0) {
    console.log("No valid images found. Using default image.", fetchedImages.length);
    imageSources.push(require("../../assets/no_image.png"));
  }

  const { t } = useTranslation();
  return (
    <View style={styles.imageContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        style={styles.scrollView}
      >
        {imageSources.map((source, index) => (
          <Image key={index} source={source} style={styles.base64Image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  base64Image: {
    width: ScreenWidth,
    height: "100%",
    resizeMode: "contain",
  },
  scrollView: {
    flexDirection: "row",
  },
});

export default Image_1;
