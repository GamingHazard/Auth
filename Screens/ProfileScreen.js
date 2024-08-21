import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { AuthContext } from "./context/AuthContext";
import ModalView from "./components/Modal";
import ProfileEditScreen from "./ProfileEditScreen";
import axios from "axios";

const ProfileScreen = () => {
  const {
    logout,
    ShowEditPage,
    HideEditPage,
    MainModal,
    SelectedImage,
    UserInfo,
    UserID,
    UserToken,
    //  deleteUserAccount,
    ShowDeleteModal,
    HideDeleteModal,
    deleteModal,
  } = useContext(AuthContext);

  const [user, setUser] = useState(UserInfo?.user || {});
  const [error, setError] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false); // State for loading

  const userName = user.username || "Name of User";
  const userPhone = user.phone ? `+256 ${user.phone}` : "Phone not available";
  const userEmail = user.email || "Email not available";

  const HideModal = async () => {
    try {
      HideEditPage();

      const profileResponse = await axios.get(
        `https://demo-backend-85jo.onrender.com/profile/${UserID}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );

      const updatedUserInfo = profileResponse.data.user;
      setUser(updatedUserInfo); // Update the user state with the latest data
    } catch (err) {
      setError("Failed to fetch updated user data.");
      console.error(err);
    }
  };

  // Deleting user Account
  const deleteUserAccount = async () => {
    setLoadingDelete(true); // Start loading
    try {
      const deleteResponse = await axios.delete(
        `https://demo-backend-85jo.onrender.com/deleteUser/${UserID}`, // Include UserID in URL
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
      setLoadingDelete(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* Profile pic */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePicContainer}>
            <Image
              source={
                SelectedImage
                  ? { uri: SelectedImage }
                  : require("../assets/profile.jpg")
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 70,
                resizeMode: "cover",
              }}
            />
          </View>

          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userHandle}>{userPhone}</Text>
          <Text style={styles.userHandle}>{userEmail}</Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: 10,
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={ShowEditPage}
              style={styles.editProfileButton}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ShowDeleteModal}
              style={styles.editProfileButton}
            >
              <Text style={styles.editProfileText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <View style={styles.logoutButtonContent}>
            <Text style={styles.logoutText}>Log out</Text>
          </View>
        </TouchableOpacity>

        {/* Edit Modal View */}
        <ModalView
          HideModal={HideModal}
          content={
            <ProfileEditScreen SaveProfile={HideModal} cancel={HideModal} />
          }
          modalVisible={MainModal}
        />

        {/* Delete Account Modal */}
        <ModalView
          content={
            <View
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 13,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "flex-start",
                  color: "red",
                }}
              >
                Confirm Deletion
              </Text>
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                }}
              >
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                {/* Cancel Delete button */}
                <TouchableOpacity
                  onPress={HideDeleteModal}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3061e4",
                    borderRadius: 20,
                    paddingHorizontal: 40,
                  }}
                >
                  <Text style={styles.editProfileText}>Cancel</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={deleteUserAccount}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "red",
                    borderRadius: 20,
                    flexDirection: "row",
                  }}
                >
                  {loadingDelete ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.editProfileText}>Delete Account</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          }
          modalVisible={deleteModal}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "auto",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 26,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
  },
  profilePicContainer: {
    height: 120,
    width: 120,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#3061e4",
    padding: 4,
    marginVertical: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 25,
  },
  userHandle: {
    fontSize: 16,
  },
  editProfileButton: {
    backgroundColor: "#3061e4",
    padding: 10,
    borderRadius: 30,
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  editProfileText: {
    fontSize: 16,
    color: "white",
  },
  divider: {
    height: 0.5,
    width: 280,
    borderWidth: 0.5,
    borderColor: "whitesmoke",
    left: 20,
    right: 20,
  },
  logoutButton: {
    width: "100%",
    height: 50,
    alignItems: "center",
    backgroundColor: "#c9d0e0",
    alignSelf: "center",
    marginVertical: 30,
    borderRadius: 40,
    paddingHorizontal: 40,
  },
  logoutButtonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "whitesmoke",
  },
});

export default ProfileScreen;
