import { createContext, useState } from "react";

export const HostContext = createContext();

export const HostProvider = ({ children }) => {
  const [currentHost, setCurrentHost] = useState(null);

  return (
    <HostContext.Provider value={{ currentHost, setCurrentHost }}>
      {children}
    </HostContext.Provider>
  );
};
