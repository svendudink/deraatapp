import React, { createContext, useState, useEffect, ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { SECTIONS } from "../constants/SafesGuide/Constants";
import i18n from "../../i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { trigger } from "../database/database";
import { syncSafes, syncStocks } from "../database/syncSafes";
import NetInfo from '@react-native-community/netinfo';

interface FilteredSafesContextType {
  appStaging: boolean;
  setAppStaging: (value: boolean) => void;

  language: string;
  getLanguage: () => string;
  changeLanguage: (lang: string) => Promise<void>;

  settings: {
    familyFilter: boolean;
    store: string;
    autoUpdate: boolean;
  };
  setSettings: React.Dispatch<React.SetStateAction<{
    familyFilter: boolean;
    store: string;
    autoUpdate: boolean;
  }>>;

  filteredSafes: any[];
  setFilteredSafes: React.Dispatch<React.SetStateAction<any[]>>;
  filteredSafesWithoutFamilyFilter: any[];
  setFilteredSafesWithoutFamilyFilter: React.Dispatch<React.SetStateAction<any[]>>;

  familyFilter: boolean;
  setFamilyFilter: React.Dispatch<React.SetStateAction<boolean>>;

  exportedInputValues: any;
  setExportedInputValues: React.Dispatch<React.SetStateAction<any>>;

  inputValues: Record<string, any>;
  setInputValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;

  activeSections: string[];
  setActiveSections: React.Dispatch<React.SetStateAction<string[]>>;

  mainDatabase: boolean;
  setmainDatabase: React.Dispatch<React.SetStateAction<boolean>>;

  dataBase: any[];
  setDataBase: React.Dispatch<React.SetStateAction<any[]>>;

  stocks: any[];
  setStocks: React.Dispatch<React.SetStateAction<any[]>>;
}

interface ProviderProps {
  children: ReactNode;
  isStaging: boolean;
}

export const FilteredSafesContext = createContext<FilteredSafesContextType | null>(null);

export const FilteredSafesContextProvider = ({ children, isStaging }: ProviderProps) => {
  // STAGING FLAG
  const [appStaging, setAppStaging] = useState(isStaging);
  useEffect(() => setAppStaging(isStaging), [isStaging]);

  // LANGUAGE
  const [language, _setLanguage] = useState("en");
  const changeLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('appLanguage', lang);
      _setLanguage(lang);
      i18n.changeLanguage?.(lang);
    } catch (e) {
      console.warn('Failed saving language', e);
    }
  };
  const getLanguage = () => language;
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('appLanguage');
        if (stored) {
          _setLanguage(stored);
          i18n.changeLanguage?.(stored);
        }
      } catch (e) {
        console.warn('Failed loading language', e);
      }
    })();
  }, []);

  // SETTINGS
  const [settings, setSettings] = useState({ familyFilter: true, store: "EU", autoUpdate: true });
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('appSettings');
        if (stored) setSettings(JSON.parse(stored));
      } catch (e) {
        console.warn('Failed loading settings', e);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
      } catch (e) {
        console.warn('Failed saving settings', e);
      }
    })();
  }, [settings]);

  // OTHER STATE
  const [filteredSafes, setFilteredSafes] = useState<any[]>([]);
  const [filteredSafesWithoutFamilyFilter, setFilteredSafesWithoutFamilyFilter] = useState<any[]>([]);
  const [familyFilter, setFamilyFilter] = useState<boolean>(true);
  const [exportedInputValues, setExportedInputValues] = useState<any>(null);
  const [inputValues, setInputValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    SECTIONS.forEach(section => {
      init[section.key] = {};
      section.fields.forEach(field => {
        if (field.type === 'inputField') {
          init[section.key][`${field.id}Min`] = '';
          init[section.key][`${field.id}Max`] = '';
        } else init[section.key][field.id] = false;
      });
    });
    return init;
  });
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const [mainDatabase, setmainDatabase] = useState<boolean>(!appStaging);
  const [dataBase, setDataBase] = useState<any[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);

  // APP READINESS & DB PRELOAD
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    let safeSub: any, stockSub: any;
    (async () => {
      try {
        const db = await trigger();
        const safesCol = db.collections.get('safes');
        const stocksCol = db.collections.get('stocks');
        safeSub = safesCol.query().observe().subscribe(setDataBase);
        stockSub = stocksCol.query().observe().subscribe(setStocks);
        setDataBase(await safesCol.query().fetch());
        setStocks(await stocksCol.query().fetch());
        const { isConnected } = await NetInfo.fetch();
        if (isConnected) {
          try {
            await syncSafes(db);
            await syncStocks(db);
          } catch (err) {
            console.warn('Sync failed', err);
          }
        }
      } catch (err) {
        console.warn('DB init error', err);
      } finally {
        setIsReady(true);
      }
    })();
    return () => {
      safeSub?.unsubscribe();
      stockSub?.unsubscribe();
    };
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FilteredSafesContext.Provider
      value={{
        appStaging,
        setAppStaging,
        language,
        getLanguage,
        changeLanguage,
        settings,
        setSettings,
        filteredSafes,
        setFilteredSafes,
        filteredSafesWithoutFamilyFilter,
        setFilteredSafesWithoutFamilyFilter,
        familyFilter,
        setFamilyFilter,
        exportedInputValues,
        setExportedInputValues,
        inputValues,
        setInputValues,
        activeSections,
        setActiveSections,
        mainDatabase,
        setmainDatabase,
        dataBase,
        setDataBase,
        stocks,
        setStocks,
      }}>
      {children}
    </FilteredSafesContext.Provider>
  );
};

export default FilteredSafesContext;
