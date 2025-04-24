import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChangingImage } from "./ChangingImage";
import FireAndBurglaryLogo from "../FireAndBurglaryLogo";

export const Content = (props) => {
  // run once to fetch & observe images
  useEffect(() => {
    (async () => {
      const images = await props.item.imageArray.fetch();
      console.log(images, "images");

      const imageArray$ = await props.imageArray.observe();
      await imageArray$.subscribe((imageArray) => {
        console.log(imageArray, "imageArray");
      });
    })();
  }, []);

  const findSeriesByName = (seriesArray, seriesName) =>
    seriesArray.find((item) => item.nameSeriesEn === seriesName);

  const logos = findSeriesByName(props.logoData, props.nameSeries) || {};

  // ---- size logic -------------------------------------------------------
  const fireGrades = logos.allfireresistanceclassifications?.filter(Boolean) || [];
  const euroGrades = logos.alleurosafeeurogrades?.filter(Boolean) || [];
  const totalGrades = fireGrades.length + euroGrades.length;
  const logoSize = totalGrades >= 6 ? 40 : 60; 
  // -----------------------------------------------------------------------

  return (
    <View style={styles.product}>
      <View style={styles.content}>
        <ChangingImage {...props} />

        <View style={styles.details}>
          <View style={styles.logoContainer}>
            {fireGrades.map((grade, index) => (
              <FireAndBurglaryLogo
                key={`fire_${index}`}
                image="fire"
                value={grade}
                totalLength={fireGrades.length}
                size={logoSize}
              />
            ))}

            {euroGrades.map((grade, index) => (
              <FireAndBurglaryLogo
                key={`burglary_${index}`}
                image="burglary"
                value={grade}
                size={logoSize}
              />
            ))}
          </View>

          <Text>Series:</Text>
          <Text style={styles.nameSeries}>{props.nameSeries}</Text>
        </View>
      </View>

      <View style={styles.actions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  product: {
    margin: 20,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
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
