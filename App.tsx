import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StackNavigator from './src/navigation/StackNavigator';
import { NavigationStateContextProvider } from './src/providers/NavigationContext';
import { FilteredSafesContextProvider } from './src/providers/SafeContext';

import WelcomePopup from './src/components/WelcomePopup';
import { WELCOME_SEEN_KEY } from './src/constants/storageKeys';
import { from } from 'rxjs';

export default function App() {
  // null = still checking storage,  true/false = done
  const [welcomeSeen, setWelcomeSeen] = useState<boolean | null>(null);

  // Run once when the app process starts
  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(WELCOME_SEEN_KEY);
      setWelcomeSeen(stored === 'true');
    };
    load();
  }, []);

  // Optional splash / loader while AsyncStorage is loading
  if (welcomeSeen === null) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <FilteredSafesContextProvider isStaging={false}>
          <NavigationStateContextProvider>

            {/* Show the popup only if it has **never** been dismissed */}
            {!welcomeSeen && (
              <WelcomePopup
                modalVisible
                setModalVisible={() => setWelcomeSeen(true)}
                setPermissionToDownload={() => {}}
              />
            )}

            <StackNavigator />

          </NavigationStateContextProvider>
        </FilteredSafesContextProvider>
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
