import AsyncStorage from "@react-native-async-storage/async-storage";
const { useState, createContext, useEffect } = require("react");

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentUser");
      jsonValue && setCurrentUser(JSON.parse(jsonValue));
    } catch (e) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
