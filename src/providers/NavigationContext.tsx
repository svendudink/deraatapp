import { createContext, useState } from "react";

const NavigationStateContext= createContext<any>({});

export const NavigationStateContextProvider = ({ children}) => {
  const [currentPage, setCurrentPage] = useState("Safes Guide");
  const [currentPagePosition, setCurrentPagePosition] = useState(null);
  const [bundleUsed, setBundleUsed] = useState(true)



  return (
    <NavigationStateContext.Provider
      value={{
       currentPage, setCurrentPage,currentPagePosition, setCurrentPagePosition,bundleUsed, setBundleUsed,
      }}
    >
      {children}
    </NavigationStateContext.Provider>
  );
};

export default NavigationStateContext;
