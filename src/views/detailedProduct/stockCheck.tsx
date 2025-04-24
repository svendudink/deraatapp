import { View } from "react-native-animatable";
import { LittleSquare } from "../../components/LittleSquare";
import FilteredSafesContext from "../../providers/SafeContext";
import { useContext, useEffect, useState, useCallback } from "react";

export const StockCheck = ({ articleNumber }) => {
  const { stocks } = useContext(FilteredSafesContext);
  const [fetchedStocks, setFetchedStocks] = useState([]);

  /* ---------------------------------
     1. Load the rows (or accept an array)
  ----------------------------------*/
  useEffect(() => {
    const fetchStocks = async () => {
      let data = [];

      if (stocks && typeof stocks.fetch === "function") {
        data = await stocks.fetch();
      } else if (Array.isArray(stocks)) {
        data = stocks;
      }
      setFetchedStocks(data);
    };

    fetchStocks();
  }, [stocks]);

  /* -------------------------------------------------------
     2. Turn a product-id → status string (“Red”, “Orange”, “Green”)
  --------------------------------------------------------*/
function getAvailableStockByProductId(productId) {
  // use find (one match) instead of filter (array of matches)
 let product = stocks.find((p) => {
    const match = Number(p.productId) === Number(productId);
    if (match) {
      console.log(typeof p.productId, typeof productId, "match", p.availableStock);
    }
    return match;
  });

  // property name is case-sensitive → availableStock
  return product ? product.availableStock : null;
}

  /* ------------------------------
     3. Your original colour switch
  -------------------------------*/
  const getBackgroundColorByStockStatus = (stockStatus) => {
    switch (stockStatus) {
      case "Red":
        return "#FA3D30";
      case "Green":
        return "#49A046";
      case "Orange":
        return "#FA9600";
      default:
        return "grey";
    }
  };

  const colour = getBackgroundColorByStockStatus(
    getAvailableStockByProductId(articleNumber)
  );

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <LittleSquare color={colour} />
    </View>
  );
};
