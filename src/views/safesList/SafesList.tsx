import { FlatList, TouchableOpacity } from "react-native";
import ProductItem from "../../components/IndividualSafe/ProductItem";

import FilteredSafesContext from "../../providers/SafeContext"
import NavigationStateContext from "../../providers/NavigationContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "../../constants/SafesGuide/Constants";
import { Button } from "react-native-elements";
import React from "react";
import AntDesign from '@react-native-vector-icons/ant-design';
import { ROUTES } from "../../navigation/route-constants";


export const SafesList = ({navigation}) => {
  
  const { setCurrentPage, currentPagePosition, setCurrentPagePosition } = useContext(NavigationStateContext)
  const { filteredSafes } = useContext(FilteredSafesContext);

  const { t } = useTranslation();
  const [data, setData] = useState([])
  const [logoData, setLogoData] = useState([])
 
   useEffect(() => {
    setCurrentPage(t('safesList'));
   }, []);
  
    useEffect(() => {
      setData(filteredSafes[0])
   
  setLogoData(returnArrayOfMatches(filteredSafes[1]))
//
}, [])
 
const getLogoTextByClassification = (classification) => {
  for (let defaultInput of defaultInputs) {
    if (defaultInput.searchArray && defaultInput.searchArray.includes(classification)) {
      return defaultInput.logoText;
    }
  }

  return "";
};


const returnArrayOfMatches = (safes) => {
  return safes.reduce((acc, { fireResistantClassificationEn, burglaryClassificationEn, nameSeriesEn }) => {
    // Find an existing series in the accumulator
    let series = acc.find(s => s.nameSeriesEn === nameSeriesEn);

    if (series) {
      // If the series already exists, add the fire resistance classification if it's not already there
      const fireResistantLogoText = getLogoTextByClassification(fireResistantClassificationEn);
      if (!series.allfireresistanceclassifications.includes(fireResistantLogoText)) {
        series.allfireresistanceclassifications.push(fireResistantLogoText);
      }
      // Add the euro safe grade classification if it's not already there
      const eurosafeEuroGradeLogoText = getLogoTextByClassification(burglaryClassificationEn);
      if (!series.alleurosafeeurogrades.includes(eurosafeEuroGradeLogoText)) {
        series.alleurosafeeurogrades.push(eurosafeEuroGradeLogoText);
      }
    } else {
      // If the series does not exist, create a new entry in the accumulator
      acc.push({
        nameSeriesEn: nameSeriesEn,
        allfireresistanceclassifications: [getLogoTextByClassification(fireResistantClassificationEn)],
        alleurosafeeurogrades: [getLogoTextByClassification(burglaryClassificationEn)]
      });
    }
    if (acc.allfireresistanceclassifications){
    acc.allfireresistanceclassifications.map((grade, index) => {
      if (grade === "") {
        console.log('Empty grade detected in allfireresistanceclassifications:', acc);
      }
    })}

    return acc;
  }, []);
}

  console.log(data, "data in safeslist");
  
  return (
    <><TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={22} color="#49A046" />
        </TouchableOpacity>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}

      renderItem={(itemData) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.DETAILED, {
              articleNumber: itemData.item.articleNumber,
            })
          }
        >
          <ProductItem
            itemData={itemData as any}
            logoData={logoData}
            nameSeries={itemData.item[`nameSeriesEn`]}
            imageArray={itemData.item.imageArray}
            price={itemData.item.weightInKg}
            description={itemData.item[`description${t("lang")}`]}
            model={itemData.item[`model${t("lang")}`]}
         
          />
        </TouchableOpacity>
      )}
    /></>
  );
};
