import React, { createContext, useContext } from 'react';

export const MeContext = createContext<string[]>([]);

export const useMeEmail = () => useContext(MeContext);

export const MeProvider: React.FC<{ value: string[]; children: React.ReactNode }> = ({ value, children }) => (
  <MeContext.Provider value={value}>
    {children}
  </MeContext.Provider>
);