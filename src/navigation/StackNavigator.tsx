import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailedProduct } from "../views/detailedProduct/DetailedProduct";
import { DrawerContent } from "./DrawerNavigator";
import { SafesList } from "../views/safesList/SafesList";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { ROUTES } from "./route-constants";



const Stack = createNativeStackNavigator();




export default function StackNavigator(): React.JSX.Element {
  const { t } = useTranslation();
    return (<NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerTintColor: '#2271A9',       // arrow + title colour
    headerStyle: { backgroundColor: '#fff' }, // keep white bar
    headerBackVisible: true,
  }}>
           <Stack.Screen
  name={ROUTES.HOME}
  component={DrawerContent}
  options={{headerShown: false}}     // keep the Stack header hidden here
/>
<Stack.Screen
  name={ROUTES.DETAILED}
  component={DetailedProduct}
  options={{title: t('detailedProduct')}}   // translate only the title
/>
<Stack.Screen
  name={ROUTES.SAFES_LIST}
  component={SafesList}
  options={({navigation}) => ({
    title: t('safesList'),
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#2271A9" />
      </TouchableOpacity>
    ),
  })}
/>

       </Stack.Navigator>
  </NavigationContainer>
  );
}