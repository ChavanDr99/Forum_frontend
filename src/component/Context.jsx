
import React, { createContext, useContext, useEffect, useState } from "react";

const SiteModeContext = createContext();

export const ContextProvider = ({ children }) => {
  const [siteMode, setSiteMode] = useState(localStorage.getItem("siteMode") || "dark");

  useEffect(() => {
    localStorage.setItem("siteMode", siteMode);
  }, [siteMode]);

  return (
    <SiteModeContext.Provider value={{ siteMode, setSiteMode }}>
      {children}
    </SiteModeContext.Provider>
  );
};

export const useSiteMode = () => useContext(SiteModeContext);
