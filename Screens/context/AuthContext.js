import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [UserToken, setUserToken] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post("https://waste-recycle-app-backend.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        // console.log(response.data.token);

        // setUserToken(response.data.token);

        let UserInfo = response.data;
        setUserInfo(UserInfo);
        setUserToken(UserInfo.token);

        AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
        AsyncStorage.setItem("userToken", UserInfo.token);
      });
  };
  const logout = () => {
    setIsLoading(true);
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
        setUserInfo(userInfo);
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
    <AuthContext.Provider
      value={{ login, logout, isLoading, UserToken, UserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};