import React,{useState,useContext} from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { useTranslation } from "react-i18next";
import { Image_1 } from "./Image_1";
import { Description_2 } from "./Description_2";
import { FireResistance_3 } from "./FireResistance_3";
import { BurglaryResistance_4 } from "./BurglaryResistance_4";
import { ModelSpecifics_5 } from "./ModelSpecifics_5";
import {OtherProducts_6} from "./OtherProducts_6"
import { ProductHeader } from "../../components/ProductHeader";
import FilteredSafesContext from "../../providers/SafeContext";
import { EmptyFooter } from "./EmptyFooter";
import AntDesign from '@react-native-vector-icons/ant-design';
import { useNavigation } from "@react-navigation/native";





export const DetailedProduct = ({ route }) => {
  
  const navigation = useNavigation();
   const {dataBase} = useContext(FilteredSafesContext)
  const { articleNumber } = route.params;
  const [activeRowArticleNumber, setActiveRowArticleNumber] = useState(articleNumber)
  const foundObject = dataBase.find((obj) => obj.articleNumber === activeRowArticleNumber);
  const { t } = useTranslation();
  return (
      <><TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={22} color="#49A046" />
        </TouchableOpacity><ProductHeader text={foundObject[`nameSeries${t("lang")}`]} />
    <ScrollView contentContainerStyle={{ paddingTop: 0 }}>
      <View style={styles.container}>
       <Image_1 foundObject={foundObject} />
        <View style={styles.content}>
          <Description_2 foundObject={foundObject[`description${t("lang")}`]} />
          <FireResistance_3 foundObject={foundObject[`fireResistantClassificationExplanation${t("lang")}`] || t("emptyFieldFire")} />
          <BurglaryResistance_4 foundObject={foundObject[`burglaryClassification${t("lang")}`] || t("emptyFieldBurglary")} />
        <ModelSpecifics_5 foundObject={foundObject}  />
        </View>
        <OtherProducts_6 foundObject={foundObject} articleNumber={articleNumber}  setActiveRowArticleNumber={setActiveRowArticleNumber} />
        <EmptyFooter />
      </View>
    </ScrollView></>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});


