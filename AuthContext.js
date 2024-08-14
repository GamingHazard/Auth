import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);

  const login = () => {
    setIsLoading(true);
    axios.post("http://localhost:3000").then((res) => {
      let UserInfo = res.data;
      setUserInfo(UserInfo);
      setUserToken(UserInfo.data.token);

      AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
      AsyncStorage.setItem("userToken", UserInfo.data.token);
    });
  };
  const logout = () => {
    setIsLoading(false);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");

    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserToken(userInfo);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
