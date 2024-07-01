import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loged, setLoged] = useState(false);
  const [user, setUser] = useState([]);

  return (
    <AuthContext.Provider value={{ loged, setLoged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
