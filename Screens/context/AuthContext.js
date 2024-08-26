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
  const register = async (name, email, phone, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://auth-db-23ly.onrender.com/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      let UserInfo = response.data;
      console.log("Registration Response:", UserInfo);

      // Check if the registration was successful
      if (response.status === 201 || response.status === 200) {
        // Ensure the token and ID are available
        const { token, id } = UserInfo.user;
        if (token && id) {
          setUserInfo(UserInfo);
          setUserToken(token);
          setUserID(id);
          console.log("User Token:", token);

          // Store the user information and token in AsyncStorage
          await AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
          await AsyncStorage.setItem("userToken", token);
          await AsyncStorage.setItem("userId", id);
        } else {
          console.log("Token or ID missing in response.");
        }
      } else {
        console.log("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Log in user
  const login = async (identifier, password) => {
    try {
      const response = await axios.post(
        "https://auth-db-23ly.onrender.com/login",
        {
          identifier,
          password,
        }
      );

      let UserInfo = response.data;

      setUserInfo(UserInfo);
      setUserToken(UserInfo.token);
      setUserID(UserInfo.user.id);
      console.log(UserInfo.user.id);
      console.log("user token is : ", UserInfo.token);

      await AsyncStorage.setItem("userInfo", JSON.stringify(UserInfo));
      await AsyncStorage.setItem("userToken", UserInfo.token);
      AsyncStorage.setItem("userId", UserInfo.user.id);

      return UserInfo; // Return the data if needed
    } catch (error) {
      // Throw the error to be caught in the component
      throw error;
    }
  };
  // Log out user
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setUserID(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userImage");
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
    // await AsyncStorage.removeItem("userImage");
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
          Alert.alert(
            "Permission Required",
            "Permission to access gallery is required!"
          );
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
          Alert.alert(
            "Permission Required",
            "Permission to access camera is required!"
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        await saveImageToStorage(imageUri);
      }
    } catch (error) {
      console.log("Error uploading image: ", error);
    }
  };

  // Storing image in AsyncStorage
  const saveImageToStorage = async (imageUri) => {
    try {
      await AsyncStorage.setItem("userImage", imageUri);
      setSelectedImage(imageUri);
    } catch (error) {
      console.log("Error saving image: ", error);
    }
  };

  // Deleting the uploaded image
  const removeImage = async () => {
    try {
      setSelectedImage(null);
      await AsyncStorage.removeItem("userImage");
    } catch (error) {
      console.log("Error removing image: ", error);
    }
  };

  // Load image from storage on component mount
  React.useEffect(() => {
    const loadImageFromStorage = async () => {
      try {
        const imageUri = await AsyncStorage.getItem("userImage");
        if (imageUri) {
          setSelectedImage(imageUri);
        }
      } catch (error) {
        console.log("Error loading image: ", error);
      }
    };

    loadImageFromStorage();
  }, []);

  // updating user profile

  // Function to handle user profile update
  const updateUserProfile = async (name, email, phone) => {
    try {
      // Ensure UserToken and UserID are available
      if (!UserToken || !UserID) {
        throw new Error("UserToken or UserID is missing.");
      }

      // Prepare the data to be updated
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;

      // Send PATCH request to update the user profile
      const updateResponse = await axios.patch(
        `https://auth-db-23ly.onrender.com/updateUser/${UserID}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      console.log("Update response:", updateResponse.data);

      // Store the updated user profile in AsyncStorage
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify(updateResponse.data)
      );
      // Update state with the refetched data
      setUserInfo(updateResponse.data); // Ensure this updates UserInfo
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    } finally {
      // Stop loading indicator
    }
  };

  // Deleting Users Account
  const deleteUserAccount = async () => {
    try {
      const deleteResponse = await axios.delete(
        `https://auth-db-23ly.onrender.com/deleteUser/${UserID}`, // Include UserID in URL
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      // Check if the deletion was successful
      if (deleteResponse.status === 200) {
        logout();
      }
    } catch (error) {
      console.log(
        "Error deleting user account:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to delete account.");
    } finally {
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
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
