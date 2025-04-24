import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView } from "react-native";

export const ChangingImage = (props) => {
  const [fetchedImages, setFetchedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let images;
      // If imageArray is a WatermelonDB association, it will have a fetch method

      if (props.imageArray && typeof props.imageArray.fetch === "function") {
        images = await props.imageArray.fetch();
      } else {
        images = props.imageArray;
      }
      setFetchedImages(images || []);
    };

    fetchImages();
  }, [props.imageArray]);

  // Build image sources from the fetched images, ignoring 'none' values.
  const imageSources = fetchedImages.reduce((acc, item) => {
    if (item.blob && item.blob !== 'none') {
      acc.push({ uri: `data:image/jpeg;base64,${item.blob}` });
    }
    return acc;
  }, []);

  // If no valid images, push a default image.
  if (imageSources.length === 0) {
    imageSources.push(require('../../assets/no_image.png'));
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      style={styles.scrollView}
    >
      {imageSources.map((source, index) => (
        <Image key={index} source={source} style={styles.base64Image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  base64Image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scrollView: {
    flexDirection: 'row',
  },
});
