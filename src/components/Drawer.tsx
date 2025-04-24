import React, { useContext} from "react";
import { View, Image, Text, TouchableWithoutFeedback,StyleSheet,TouchableOpacity,Linking } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { ReportBugs } from "../views/ReportBugs";
import { Settings } from "../views/settings/Settings";
import { Disclaimer } from "../views/Disclaimer";
import Ionicons from '@react-native-vector-icons/ionicons';
import ContactPage from "../views/Contact";
import FilteredSafesContext from "../providers/SafeContext";
import Config from 'react-native-config';
import { DEV } from "../DEV_FOLDER/DEV";
import { useRealm } from "@realm/react";
import { BSON } from "realm";
import { SafesGuide } from "../views/safesGuide/SafesGuide";






const Drawer = createDrawerNavigator();





export function DrawerContent() {
  const { settings, mainDatabase ,appStaging} = useContext(FilteredSafesContext);
  const { t } = useTranslation();
  
  const Logo = !appStaging ? require("../assets/newLogo.png") : require("../assets/newLogoOrange.png")


  const realm = useRealm()
  const submitStagingApproval = (bugreportIn) => {
  return new Promise((resolve, reject) => {
    try {
    
      console.log("trigger", bugreportIn);
      realm.write(() => {
        // Ensure _id is generated if not provided
        const bugReportData = {
          _id: new BSON.ObjectId(),
          ...bugreportIn
        };

        const test = realm.create("stagingsettings", bugReportData);
        console.log(test, "resulting");
        resolve("Staging approval submitted successfully.");
      });
    } catch (err) {
      console.error(err);
      reject("Failed to submit bug report.");
    }
  });
};
  
  
  

  

   return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      
      screenOptions={{
        headerTintColor: "#49A046",
        drawerPosition: 'left',
        headerStyle: {
          backgroundColor: "#ffffff"
        }
    }}
    >
      <Drawer.Screen
        name={t("drawer.safesGuide")}
        component={SafesGuide}
        options={{
          // drawerIcon: ({ focused, color, size }) => (
          //   <Ionicons name={"search-outline"} size={size} color={color} />
          // ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: t("drawer.safesGuide"),
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
      />
      <Drawer.Screen
        name={t("drawer.contact")}
        component={ContactPage}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"mail-open-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: t("drawer.contact"),
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
      />

      <Drawer.Screen
        name={t("drawer.settings")}
        component={Settings}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"settings-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: t("drawer.settings"),
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
      />
      {/* <Drawer.Screen
        name={t("drawer.bugsOrSuggestions")}
        component={ReportBugs}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"bug-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: t("drawer.bugsOrSuggestions"),
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
      /> */}
      <Drawer.Screen
        name={t("drawer.disclaimer")}
        component={Disclaimer}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"hand-left-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: t("drawer.disclaimer"),
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
       />
     {/* <Drawer.Screen
  name={"Developer release notes"}
  component={WelcomePopup({setWelcomePopupBool,WelcomePopupBool})} // Keep your existing component here
  listeners={{
    
  }}
  options={{
    drawerIcon: ({ focused, color, size }) => (
      <Ionicons name={"code-working-outline"} size={size} color={color} />
    ),
    drawerActiveBackgroundColor: "#49a046",
    drawerActiveTintColor: "#ffffff",
    drawerLabel: "Dev release notes",
    title: "",
    headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
  }}
/> */}
       
   {Config.ENV === "development" && <Drawer.Screen
        name={"DEVTAB"}
        component={DEV}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"code-working-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: t("DEVTAB"),
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
       />}
       {!mainDatabase && <Drawer.Screen
        name={"Approve"}
         component={DEV}
         
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"code-working-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: "Approve changes",
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
         listeners={({ navigation, route }) => ({
    focus: () => {
             console.log("potatoclock");
              submitStagingApproval({isApproved: "true", isDeclinded: "false"})
    }
  })}
       />}
       {!mainDatabase && <Drawer.Screen
        name={"Decline"}
         component={DEV}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={"code-working-outline"} size={size} color={color} />
          ),
          drawerActiveBackgroundColor: "#49a046",
          drawerActiveTintColor: "#ffffff",
          drawerLabel: "Decline changes",
          title: "",
          headerRight: props => <Image source={Logo} style={{ width: 120, height: 40 }} />,
        }}
                  listeners={({ navigation, route }) => ({
    focus: () => {
                      console.log("decline");
                       submitStagingApproval({isApproved: "false", isDeclinded: "true"})
    }
  })}
       />}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { mainDatabase, setmainDatabase } = useContext(FilteredSafesContext)
    const { t } = useTranslation();

let pressTimer:any;
    const handlePressIn = () => {
    pressTimer = setTimeout(() => {
      console.log('Pressed for 5 seconds');
      console.log(mainDatabase);
      if (mainDatabase) {
        setmainDatabase(false)
      } else {
        setmainDatabase(true)
      }
    }, 2000); // Set the timer for 5 seconds
  };

  const handlePressOut = () => {
    clearTimeout(pressTimer); // Clear the timer if the press is released
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
<TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={mainDatabase ? require("../assets/newLogo.png") : require("../assets/newLogoOrange.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footerContainer}>
  <View style={styles.footerTextContainer}>
    <Text style={styles.memberText}>{t("memberOf")}</Text>
  </View>
  <ImageLayout />
</View>
    </View>
  );
}



const ImageLayout = () => {
  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => openURL('https://geldenwaardeberging.nl/')} style={styles.touchable}>
        <Image source={require("../assets/partoflogos/vgw.png")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL('https://www.eurosafe-online.com/')} style={styles.touchable}>
        <Image source={require("../assets/partoflogos/logo-eurosafe.png")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL('https://ecb-s.com/')} style={styles.touchable}>
        <Image source={require("../assets/partoflogos/essa.jpg")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL('https://www.bsvta.co.uk/')} style={styles.touchable}>
        <Image source={require("../assets/partoflogos/bsvta.png")} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openURL('http://www.belgosafe.be/')} style={styles.touchable}>
        <Image source={require("../assets/partoflogos/belgosafe.jpg")} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: '18%', // Adjust width as needed
    alignItems: 'center', // Center the image within the touchable area
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%', // Make sure row takes full width
  },
  image: {
    width: '100%', // Adjust width to fit all images in one row
    height: 50,   // Adjust as needed
    resizeMode: 'contain',
  },container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 120,
  },
  footerContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    
  },
  footerTextContainer: {
    // Add padding or margin as needed to create space between text and images
    paddingBottom: 10, // Adjust this value as needed
   
    

  },
  memberText: {
    fontSize: 13
  }
});

export default ImageLayout;

