import { createContext, useState } from "react";
import { SECTIONS } from "../constants/SafesGuide/Constants";
import { useEffect } from "react";


const FilteredSafesContext = createContext<any>({});

export const FilteredSafesContextProvider = ({ children, isStaging }) => {
  const [appStaging, setAppStaging] = useState(isStaging)
useEffect(() => {
setAppStaging(isStaging)
}, [isStaging])

useEffect(() => {

  (async function () {
    const value = "true"
    if(value === "true" || value === "false" ) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        autoUpdate: value === "false" ? false : true
         }));
 
  }
  })()

 
}, [])






  const [filteredSafes, setFilteredSafes] = useState([]);
  const [stocks, setStocks] = useState([])
  const [dataBase,setDataBase] = useState([])
  const [filteredSafesWithoutFamilyFilter, setFilteredSafesWithoutFamilyFilter] = useState([]);
  const [familyFilter, setFamilyFilter] = useState(true);
  const [language, setLanguage] = useState("en");
  const [exportedInputValues, setExportedInputValues] = useState()
  const [mainDatabase, setmainDatabase] = useState(!appStaging)
  const [settings, setSettings] = useState({
    familyFilter: true,
    store: "EU",
    autoUpdate: true
  });




       const [activeSections, setActiveSections] = useState([]); 
  const [inputValues, setInputValues] = useState(() => {
    const initialValues = {};
    SECTIONS.forEach(section => {
        initialValues[section.key] = {};
        section.fields.forEach(field => {
            if (field.type === "inputField") {
                initialValues[section.key][`${field.id}Min`] = '';
                initialValues[section.key][`${field.id}Max`] = '';
            } else {
                initialValues[section.key][field.id] = false; // Initialize switches as 'off'
            }
        });
    });
    return initialValues;
  });

  return (
    <FilteredSafesContext.Provider
      value={{
        filteredSafes,
        setFilteredSafes,
        setFamilyFilter,
        familyFilter,
        settings,
        setSettings,
        language,
        setLanguage,
        filteredSafesWithoutFamilyFilter,
        setFilteredSafesWithoutFamilyFilter, exportedInputValues,
        setExportedInputValues, inputValues,
        setInputValues, activeSections, setActiveSections, mainDatabase, setmainDatabase,
       appStaging, setAppStaging,dataBase,setDataBase,stocks, setStocks
      }}
    >
      {children}
    </FilteredSafesContext.Provider>
  );
};
export const UkStore = true
export default FilteredSafesContext;
