import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { AuthContext } from "./context/AuthContext";
import { Modal, ModalContent } from "react-native-modals";
import ModalView from "./components/Modal";
import ProfileEditScreen from "./ProfileEditScreen";

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);

  const ShowModal = () => {
    setModalVisible(true);
  };
  const HideModal = () => {
    // cancelImageUpload();
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <EvilIcons name="chevron-left" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* Profile pic */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePicContainer}>
            <Image
              source={require("../assets/profile.jpg")}
              style={styles.profilePic}
            />
          </View>

          <Text style={styles.userName}>Name of User</Text>
          <Text style={styles.userHandle}>@username</Text>

          <TouchableOpacity
            onPress={ShowModal} // Use the toggle function
            style={styles.editProfileButton}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout} // Example of logout navigation
        >
          <View style={styles.logoutButtonContent}>
            <Text style={styles.logoutText}>Log out</Text>
          </View>
        </TouchableOpacity>

        {/* Modal View */}
        <ModalView
          HideModal={HideModal}
          content={<ProfileEditScreen cancel={HideModal} />}
          modalVisible={modalVisible}
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
  backButton: {
    borderRadius: 24,
    backgroundColor: "#c9d0e0",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
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
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
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
  modalContent: {
    width: 500,
    height: 300,
    backgroundColor: "lightgreen",
  },
});

export default ProfileScreen;
