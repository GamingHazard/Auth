import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [UserToken, setUserToken] = useState(null);
  const [UserInfo, setUserInfo] = useState(null);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [MainModal, setMainModal] = useState(false);
  const [UserID, setUserID] = useState(false);

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
        console.log(response);

        // setUserToken(response.data.token);

        let UserInfo = response.data;

        setUserInfo(UserInfo);
        setUserToken(UserInfo.token);
        setUserID(UserInfo.user.id);

        AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
        AsyncStorage.setItem("userToken", UserInfo.token);
      });
  };

  // Logging in user
  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post("https://demo-backend-85jo.onrender.com/login", {
        email,
        password,
      })
      .then((response) => {
        // console.log(response.data.user.id);

        let UserInfo = response.data;

        setUserInfo(UserInfo);
        setUserToken(UserInfo.token);
        setUserID(UserInfo.user.id);

        console.log(UserInfo.user.id);

        AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
        AsyncStorage.setItem("userToken", UserInfo.token);
      });
  };

  // logout user
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

  // toggel image selection modal
  const ShowModal = () => {
    setModalVisible(true);
  };

  const HideModal = () => {
    setModalVisible(false);
  };

  // toggle main Edit Page modal

  const ShowEditPage = () => {
    setMainModal(true);
  };
  const HideEditPage = async () => {
    // setSelectedImage(null);
    await AsyncStorage.removeItem("userImage");
    setMainModal(false);
  };

  // function for uploading image
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

  // stoaring image in AsyncStorage
  const saveImageToStorage = async (imageUri) => {
    try {
      setSelectedImage(imageUri);
      await AsyncStorage.setItem("userImage", imageUri);
      setModalVisible(false);
    } catch (error) {
      console.log("Error saving image: " + error);
    }
  };

  // deleting the uploaded image
  const removeImage = async () => {
    try {
      setSelectedImage(null);
      await AsyncStorage.removeItem("userImage");
      setModalVisible(false);
    } catch (error) {
      console.log("Error removing image: " + error);
    }
  };

  // updating user profile
  const updateUserProfile = async (username, email, phone) => {
    try {
      // Send the PATCH request to update the user profile
      const updateResponse = await axios.patch(
        "https://demo-backend-85jo.onrender.com/updateUser", // Replace with your actual API URL
        { username, email, phone }, // Data to be sent in the request body
        {
          headers: {
            Authorization: `Bearer ${UserToken}`, // Include the token in the Authorization header
          },
        }
      );

      //  if (updateResponse.status === 200) {
      //    console.log(
      //      "Profile updated successfully:",
      //      updateResponse.data.results.updateUser
      //    );

      //    // Fetch the updated user data
      //    const fetchResponse = await axios.get(
      //      `https://demo-backend-85jo.onrender.com/profile/${UserID}`, // Replace with your actual API URL
      //      {
      //        headers: {
      //          Authorization: `Bearer ${UserToken}`, // Include the token in the Authorization header
      //        },
      //      }
      //    );

      //    if (fetchResponse.status === 200) {
      //      setUserInfo(fetchResponse.data.user); // Update the user info in state
      //      console.log("Fetched updated user data:", fetchResponse.data.user);
      //    }
      //  }
    } catch (error) {
      console.error(
        "Error updating or fetching profile:",
        error.response?.data || error.message
      );
      // Handle the error (e.g., display an error message to the user)
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
        ShowModal,
        HideModal,
        modalVisible,
        ShowEditPage,
        HideEditPage,
        MainModal,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
