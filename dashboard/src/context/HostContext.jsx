import { createContext, useState } from "react";

export const HostContext = createContext();

export const HostProvider = ({ children }) => {
  const [currentHost, setCurrentHost] = useState(null);
  const [theme, setTheme] = useState('dark-mode');

  return (
    <HostContext.Provider value={{ currentHost, setCurrentHost, theme, setTheme }}>
      {children}
    </HostContext.Provider>
  );
};
