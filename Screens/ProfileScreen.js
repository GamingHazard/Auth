import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
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
    updateUserInfo,
    UserID,
  } = useContext(AuthContext);

  const [user, setUser] = useState(UserInfo?.user || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://demo-backend-85jo.onrender.com/profile/${UserID}`
      );
      setUser(response.data.user);
      updateUserInfo(response.data.user);
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [UserID]);

  const userName = user.name || "Name of User";
  const userPhone = user.phone ? `+256 ${user.phone}` : "Phone not available";
  const userEmail = user.email || "Email not available";

  const ShowModal = () => {
    ShowEditPage();
  };

  const HideModal = async () => {
    await fetchUserData();
    HideEditPage();
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

          <TouchableOpacity
            onPress={ShowModal}
            style={styles.editProfileButton}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
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
