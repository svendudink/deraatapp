import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationStateContextProvider } from "./src/providers/NavigationContext";
import { FilteredSafesContextProvider } from './src/providers/SafeContext';

export default function App(): React.JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <FilteredSafesContextProvider isStaging={false}> 
          <NavigationStateContextProvider>
            <StackNavigator />
          </NavigationStateContextProvider>
        </FilteredSafesContextProvider> 
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
