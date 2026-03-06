import { createContext, useContext, useState, useEffect } from 'react';

const IdentityContext = createContext();

export const useIdentity = () => useContext(IdentityContext);

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Logic định danh ẩn danh
    const storedId = localStorage.getItem('user_secret_id');
    const storedAlias = localStorage.getItem('user_alias');

    if (storedId && storedAlias) {
      setUser({ id: storedId, alias: storedAlias });
    } else {
      // Giả lập tạo mới (M2 sẽ viết logic random xịn hơn)
      // eslint-disable-next-line no-unused-vars
      const newUserData = {
        id: Math.random().toString(36).substring(2, 11),
        alias: "Dev Ẩn Danh #" + Math.floor(Math.random() * 999)
      };

      localStorage.setItem('user_secret_id', newUserData.id);
      localStorage.setItem('user_alias', newUserData.alias);
      setUser(newUserData);
    }
  }, []);

  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      {children}
    </IdentityContext.Provider>
  );
};
