import React, { useState,useEffect, useContext} from "react";
import {Text,View,TouchableOpacity, ScrollView} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { SECTIONS } from "../../constants/SafesGuide/Constants";
import { RenderContent } from "./RenderContent";
import { RenderHeader } from "./RenderHeader";
import { filter } from "../../services/filters";
import { styles } from "./SafesGuideStyles";
import FilteredSafesContext from "../../providers/SafeContext";
import NavigationStateContext from "../../providers/NavigationContext";
import { Footer_1 } from "./Footer_1";
import { Footer_2 } from "./Footer_2";
import * as Animatable from "react-native-animatable";
import { ProductHeader } from "../../components/ProductHeader";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { trigger } from "../../database/database";
import { syncSafes, syncStocks } from "../../database/syncSafes";
import { ROUTES } from "../../navigation/route-constants";
import NetInfo from '@react-native-community/netinfo'





export const SafesGuide = ({ navigation }) => { 
 const { appStaging, setmainDatabase, settings,dataBase,setDataBase,setStocks } = useContext(FilteredSafesContext)
useEffect(() => {
  let safeSub, stockSub

  ;(async () => {
    // 1) open your persistent DB
    const db = await trigger()

    const safesCol  = db.collections.get('safes')
    const stocksCol = db.collections.get('stocks')

    // 2) subscribe so UI updates whenever local data changes
    safeSub  = safesCol.query().observe().subscribe(setDataBase)
    stockSub = stocksCol.query().observe().subscribe(setStocks)

    // 3) seed UI with whatever is already in the local DB
    setDataBase(await safesCol.query().fetch())
    setStocks  (await stocksCol.query().fetch())

    // 4) now try to sync — but don’t let an offline error kill your reads
    const { isConnected } = await NetInfo.fetch()
    if (isConnected) {
      try {
        await syncSafes(db)
        await syncStocks(db)
        // after a successful sync, your observers (from step 2) will fire again
      } catch (err) {
        console.warn('Background sync failed — showing local data only', err)
      }
    }
  })()

  return () => {
    if (safeSub)  safeSub.unsubscribe()
    if (stockSub) stockSub.unsubscribe()
  }
}, [])

   
        const { t } = useTranslation();
   

    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const [secretLoginVariables, setSecretLoginVariables] = useState({
        username: "017383",
        userNameAccepted: false,
        password: "46578",
        passwordAccepted: false,
        loginReady: false
    })

const secretLogin = (inputValues) => {
    let updatedVariables = { ...secretLoginVariables };

    // Check if username matches
    if (inputValues.searchByWeight.weightMin === secretLoginVariables.username) {
        updatedVariables.userNameAccepted = true;
        console.log("1")
    } else {
        updatedVariables.userNameAccepted = false;
    }

    // Check if password matches
    if (inputValues.searchByWeight.weightMax === secretLoginVariables.password) {
        updatedVariables.passwordAccepted = true;
         console.log("2")
    } else {
        updatedVariables.passwordAccepted = false;
    }

    if (updatedVariables.userNameAccepted && updatedVariables.passwordAccepted) {
        updatedVariables.loginReady = true
    } else {
 updatedVariables.loginReady = false
    }

    // Update the state with the new values
    setSecretLoginVariables(updatedVariables);

    // You can add additional logic here to take action if both username and password are accepted
};


    
    


   
const { setFilteredSafes,setExportedInputValues,inputValues, setInputValues,activeSections, setActiveSections } = useContext(FilteredSafesContext);
    const { currentPage, setCurrentPage, currentPagePosition, setCurrentPagePosition } = useContext(NavigationStateContext)
 
    
useEffect(() => {
    if (currentPage && currentPage !== "Safes Guide") {
      //  setFilteredSafes(filter(inputValues, SAFES,settings));
        console.log("refreshing here", currentPage);
      
        navigation.navigate(currentPage);
        setCurrentPage(false)
        
    } else {
        setCurrentPage("Safes Guide");
    }
}, [dataBase]);

        

    if (!true) {
        // Render a loading spinner or a placeholder
        return <LoadingSpinner />;
    } else {
        return (
            <View style={styles.container}>
       
                <ScrollView
                  
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {/* <Header
        centerComponent={{
            text: 'Safes Guide',
            style: styles.headerStyle,
        }}
        backgroundImage={require("../../assets/backGroundWide.png")}
        backgroundImageStyle={{ resizeMode: 'cover' }}
        containerStyle={{
            paddingTop: 0,
        }}
    /> */}
                    <ProductHeader text={t("safesGuide")} />
                    <Accordion
                        activeSections={activeSections}
                        sections={SECTIONS}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={false}
                        renderHeader={(section, _, isActive) =>
                            <RenderHeader
                                section={section}
                                isActive={isActive}
                                inputValues={inputValues}
                                setInputValues={setInputValues}
                            />
                        }
                        renderContent={(section, _, isActive) =>
                            <RenderContent
                                key={section.key}
                                section={section}
                                isActive={isActive}
                                inputValues={inputValues}
                                setInputValues={setInputValues}
                            />
                        }
                        duration={400}
                        onChange={(change) => setActiveSections(change)}
                        renderAsFlatList={false}
                    />

                    <View style={styles.searchButtonContainer}>
                        <TouchableOpacity
                            style={styles.searchButton}
          
                            onPress={() => {
                                if (!secretLoginVariables.loginReady) {
                                    console.log(dataBase[0]);
                                    setFilteredSafes(filter(inputValues, dataBase,settings));
                                    navigation.navigate(ROUTES.SAFES_LIST);
                                } else {
                                    setmainDatabase(false)
                                }
                            }}
                        >
                     

                            <Text style={styles.searchButtonText}>
                                {secretLoginVariables.loginReady ? "Staging login" : filter(inputValues, dataBase,settings)[0].length === 0
                                    ? t("noSafesFound")
                                    : filter(inputValues, dataBase,settings)[0].length === 1
                                        ? t("view1safe")
                                        : `${t("view")} ${filter(inputValues, dataBase,settings)[0].length} ${t("safes")}`}
                            </Text>
                        </TouchableOpacity>
                    </View>

         
                </ScrollView>
                {!activeSections.length && (
                    <Animatable.View animation="fadeIn" duration={1200}>
                        <Footer_1 />
                    </Animatable.View>
                )}
                {!activeSections.length && (
                    <Animatable.View animation="fadeIn" duration={300}>
                        <Footer_2 />
                    </Animatable.View>
                )}
            </View>
        );
    }
}


