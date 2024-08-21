import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import ModalView from "./components/Modal";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "./context/AuthContext";

const ProfileEditScreen = ({ cancel, SaveProfile }) => {
  const {
    uploadImage,
    removeImage,
    SelectedImage,
    UserInfo,
    updateUserProfile,
  } = useContext(AuthContext);

  // State for form inputs
  const [username, setUsername] = useState(UserInfo.user.name);
  const [email, setEmail] = useState(UserInfo.user.email);
  const [phone, setPhone] = useState(UserInfo.user.phone);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploadModal, setimageUploadModal] = useState(false);

  const ShowImageModal = () => {
    setimageUploadModal(true);
  };
  const HideImageModal = () => {
    setimageUploadModal(false);
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await updateUserProfile(username, email, phone);
      SaveProfile();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInner}></View>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Profile pic */}
        <View style={styles.profilePicContainer}>
          <Text style={styles.headerText}>Edit Profile</Text>
          <View style={styles.profilePicWrapper}>
            <Image
              source={
                SelectedImage
                  ? { uri: SelectedImage }
                  : require("../assets/profile.jpg")
              }
              style={styles.profilePic}
            />
          </View>
          {/* Camera Icon */}
          <TouchableOpacity onPress={ShowImageModal} style={styles.cameraIcon}>
            <Fontisto name="camera" size={15} color="#3061e4" />
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal */}
        <ModalView
          content={
            <View style={styles.modalContent}>
              <FontAwesome
                onPress={HideImageModal}
                style={styles.modalCloseIcon}
                name="times-circle-o"
                size={24}
                color="black"
              />
              <View style={styles.modalOptions}>
                {/* Select image from gallery */}
                <TouchableOpacity
                  onPress={() => {
                    uploadImage("gallery");
                    setimageUploadModal(false);
                  }}
                  style={styles.modalOption}
                >
                  <Entypo name="images" size={35} color="#3061e4" />
                  <Text>Gallery</Text>
                </TouchableOpacity>
                {/* Select image by camera */}
                <TouchableOpacity
                  onPress={() => {
                    uploadImage("camera");
                    setimageUploadModal(false);
                  }}
                  style={styles.modalOption}
                >
                  <AntDesign name="camera" size={35} color="#3061e4" />
                  <Text>Camera</Text>
                </TouchableOpacity>

                {/* Delete image */}
                <TouchableOpacity
                  onPress={() => {
                    removeImage();
                    setimageUploadModal(false);
                  }}
                  style={styles.modalOption}
                >
                  <Entypo name="trash" size={35} color="#3061e4" />
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          modalVisible={imageUploadModal}
        />

        {/* Line */}
        <View style={styles.line} />

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.label}>Tel Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={cancel} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={styles.button}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" /> // Show spinner when loading
              ) : (
                <Text style={styles.buttonText}>Update</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
    borderRadius: 15,
  },
  header: {
    width: "100%",
    height: "auto",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "50%",
  },
  profilePicContainer: {
    alignItems: "center",
    width: "60%",
    height: 230,
    paddingTop: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 26,
  },
  profilePicWrapper: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#3061e4",
    padding: 4,
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
    resizeMode: "cover",
  },
  cameraIcon: {
    left: 48,
    top: -48,
    backgroundColor: "#f2f5fc",
    padding: 8,
    borderRadius: 40,
  },
  modalContent: {
    width: 280,
    height: "auto",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  modalCloseIcon: {
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  modalOption: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f5fc",
    borderRadius: 10,
  },
  line: {
    height: 0.5,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "whitesmoke",
    left: 20,
    right: 20,
  },
  inputContainer: {
    width: 400,
    height: "auto",
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    left: 30,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 16,
    borderRadius: 40,
    backgroundColor: "#f2f5fc",
    marginTop: 5,
    alignSelf: "center",
    paddingLeft: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    width: "100%",
    alignSelf: "center",
    top: -15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3061e4",
    alignSelf: "center",
    marginVertical: 30,
    borderRadius: 40,
    padding: 10,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProfileEditScreen;
