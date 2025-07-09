import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/auth/check', { withCredentials: true })
      .then(res => res.data.isAuthenticated && setUser(res.data.user));
  }, []);

  const login = async (username, password) => {
    const res = await axios.post('/auth/login', { username, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
