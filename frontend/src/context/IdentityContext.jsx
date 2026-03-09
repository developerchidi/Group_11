/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const IdentityContext = createContext();

export const useIdentity = () => useContext(IdentityContext);

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedId = localStorage.getItem('user_secret_id');
    const storedAlias = localStorage.getItem('user_alias');

    if (storedId && storedAlias) {
      return { id: storedId, alias: storedAlias };
    }

    const newId = Math.random().toString(36).substring(2, 11);
    const newAlias = 'Dev An Danh #' + Math.floor(Math.random() * 999);

    localStorage.setItem('user_secret_id', newId);
    localStorage.setItem('user_alias', newAlias);
    return { id: newId, alias: newAlias };
  });

  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      {children}
    </IdentityContext.Provider>
  );
};
