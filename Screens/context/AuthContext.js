import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [UserToken, setUserToken] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [MainModal, setMainModal] = useState(false);
  const [UserID, setUserID] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);

  // Register new user
  const register = (username, email, phone, password) => {
    setIsLoading(true);
    axios
      .post("https://demo-backend-85jo.onrender.com/register", {
        username,
        email,
        phone,
        password,
      })
      .then((response) => {
        let UserInfo = response.data;
        // console.log(response.data);

        setUserInfo(UserInfo);
        setUserToken(UserInfo.token);
        setUserID(UserInfo.user.id);
        // console.log(UserInfo.token);

        AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
        AsyncStorage.setItem("userToken", UserInfo.token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Log in user
  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post("https://demo-backend-85jo.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        let UserInfo = response.data;

        setUserInfo(UserInfo);
        setUserToken(UserInfo.token);
        setUserID(UserInfo.user.id);

        AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
        AsyncStorage.setItem("userToken", UserInfo.token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Log out user
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setUserID(null);
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
        setUserID(userInfo.user.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  // Toggle main Edit Page modal
  const ShowEditPage = () => {
    setMainModal(true);
  };

  const HideEditPage = async () => {
    await AsyncStorage.removeItem("userImage");
    setMainModal(false);
  };

  // delete user profile modal
  const ShowDeleteModal = () => {
    setdeleteModal(true);
  };
  const HideDeleteModal = () => {
    setdeleteModal(false);
  };

  // Function for uploading image
  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === "gallery") {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
          alert("Permission to access gallery is required!");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        const permissionResult =
          await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
          alert("Permission to access camera is required!");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImageToStorage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error is caused by: " + error);
    }
  };

  // Storing image in AsyncStorage
  const saveImageToStorage = async (imageUri) => {
    try {
      setSelectedImage(imageUri);
      await AsyncStorage.setItem("userImage", imageUri);
    } catch (error) {
      console.log("Error saving image: " + error);
    }
  };

  // Deleting the uploaded image
  const removeImage = async () => {
    try {
      setSelectedImage(null);
      await AsyncStorage.removeItem("userImage");
    } catch (error) {
      console.log("Error removing image: " + error);
    }
  };

  const updateUserProfile = async (username, email, phone) => {
    setIsLoading(true);
    try {
      // Update the user profile
      await axios.patch(
        "https://demo-backend-85jo.onrender.com/updateUser",
        { username, email, phone },
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );
    } catch (error) {
      console.log(
        "Error updating or fetching profile:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoading,
        UserToken,
        UserInfo,
        uploadImage,
        removeImage,
        SelectedImage,
        ShowEditPage,
        HideEditPage,
        MainModal,
        UserID,
        updateUserProfile,
        ShowDeleteModal,
        HideDeleteModal,
        deleteModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
