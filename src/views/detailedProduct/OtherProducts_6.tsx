import { SingleProductLine } from "./SingleProductLine";
import React,{useState, useContext} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import FilteredSafesContext from "../../providers/SafeContext";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Popup from "../../components/Popup";


export const OtherProducts_6 = ({ foundObject, articleNumber, setActiveRowArticleNumber }) => { 
  const [modalVisible, setModalVisible] = useState(false);
  const { filteredSafes,dataBase } = React.useContext(FilteredSafesContext);

  const { t } = useTranslation();
  const productsWithSameNameSeries = filteredSafes[1].filter(
    (obj) => obj.nameSeriesEn === foundObject.nameSeriesEn
    );
    const [activeRow, setActiveRow] = useState(productsWithSameNameSeries[0].articleNumber)
    
  return (<View>
      <Popup modalVisible={modalVisible} setModalVisible={setModalVisible} />
          <Text style={styles.otherProductsTitle}>
            {t("allProductsTitle", {
              seriesName: foundObject[`nameSeries${t("lang")}`],
            })}
          </Text>
         <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>{t("modelTitle")}</Text>
      <Text style={styles.tableHeaderText}>{t("weightTitle")}</Text>
      <Text style={styles.tableHeaderText}>{t("capacityTitle")}</Text>
      <View style={styles.inStockContainer}>
        <Text style={styles.tableHeaderText}>{"In stock"}</Text>
        <Pressable onPress={() => setModalVisible(true)}>
 
    <FontAwesome6 name="block-question" iconStyle="solid" style={styles.questionIcon} />
  </Pressable>
      </View>
    </View>
          {productsWithSameNameSeries.map((product, index) => {
            return (
              <SingleProductLine product={product} articleNumber={articleNumber} index={index} key={`${index}${product.articleNumber}`} setActiveRowArticleNumber={setActiveRowArticleNumber} activeRow={activeRow} setActiveRow={setActiveRow} />       
            );
          })}
        </View>)
}

const styles = StyleSheet.create({
      otherProductText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    color: "black",
    },
    otherProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
   tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#49A046",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    marginVertical: 10,        // keep this for model/weight/capacity
  },
  inStockContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",  // <-- center both children vertically
  },
  questionIcon: {
    fontSize: 16,
    color: "#000",
    marginTop: 4,              // small gap between text and icon
  }

})