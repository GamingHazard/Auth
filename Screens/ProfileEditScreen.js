import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import ModalView from "./components/Modal";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

import AvatarImg from "../assets/profile.jpg";
import { AuthContext } from "./context/AuthContext";

const ProfileEditScreen = ({ cancel, SaveProfile }) => {
  const {
    uploadImage,
    removeImage,
    SelectedImage,
    ShowModal,
    HideModal,
    modalVisible,
    UserInfo,
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          width: "100%",
          height: "auto",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></View>
      </View>
      <ScrollView style={{ flex: 1, width: "50%" }}>
        {/* Profile pic */}
        <View
          style={{
            alignItems: "center",
            width: "60%",
            height: 230,
            paddingTop: 30,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>Edit Profile</Text>

          <View
            style={{
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
            }}
          >
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

          {/* Camera Icon */}
          <TouchableOpacity
            onPress={ShowModal}
            style={{
              left: 38,
              top: -38,
              backgroundColor: "#f2f5fc",
              padding: 5,
              borderRadius: 40,
            }}
          >
            <Fontisto name="camera" size={15} color="#3061e4" />
          </TouchableOpacity>
        </View>

        {/* Edit Profile Modal */}
        <ModalView
          HideModal={HideModal}
          content={
            <View
              style={{
                width: 280,
                height: "auto",
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <FontAwesome
                onPress={HideModal}
                style={{ alignSelf: "flex-end", marginBottom: 15 }}
                name="times-circle-o"
                size={24}
                color="black"
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {/* Select image from gallery */}
                <TouchableOpacity
                  onPress={() => uploadImage("gallery")}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f2f5fc",
                    borderRadius: 10,
                  }}
                >
                  <Entypo name="images" size={35} color="#3061e4" />
                  <Text>Gallery</Text>
                </TouchableOpacity>
                {/* Select image by camera */}
                <TouchableOpacity
                  onPress={() => uploadImage("camera")}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f2f5fc",
                    borderRadius: 10,
                  }}
                >
                  <AntDesign name="camera" size={35} color="#3061e4" />
                  <Text>Camera</Text>
                </TouchableOpacity>

                {/* Delete image */}
                <TouchableOpacity
                  onPress={removeImage}
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f2f5fc",
                    borderRadius: 10,
                  }}
                >
                  <Entypo name="trash" size={35} color="#3061e4" />
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          modalVisible={modalVisible}
        />

        {/* Line */}
        <View
          style={{
            height: 0.5,
            width: 400,
            borderWidth: 0.5,
            borderColor: "whitesmoke",
            left: 20,
            right: 20,
          }}
        />

        {/* Inputs */}
        <View style={{ width: "100%", height: "auto", padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, left: 40 }}>
            Name
          </Text>
          <View
            style={{
              width: "80%",
              padding: 10,
              marginBottom: 16,
              borderRadius: 40,
              backgroundColor: "#f2f5fc",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder={UserInfo.username}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, left: 40 }}>
            Email
          </Text>
          <View
            style={{
              width: "80%",
              padding: 10,
              marginBottom: 16,
              borderRadius: 40,
              backgroundColor: "#f2f5fc",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder={UserInfo.email}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, left: 40 }}>
            Tel Number
          </Text>
          <View
            style={{
              width: "80%",
              padding: 10,
              marginBottom: 16,
              borderRadius: 40,
              backgroundColor: "#f2f5fc",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder={`(+256) ${" "} ${UserInfo.phone}`}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, left: 40 }}>
            Password
          </Text>
          <View
            style={{
              width: "80%",
              padding: 10,

              borderRadius: 40,
              backgroundColor: "#f2f5fc",
              marginTop: 5,
              alignSelf: "center",
            }}
          >
            <TextInput style={{ paddingLeft: 10 }} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",

              padding: 10,
              width: "100%",
              alignSelf: "center",
              top: -15,
            }}
          >
            <TouchableOpacity
              onPress={cancel}
              style={{
                alignItems: "center",
                backgroundColor: "#3061e4",
                alignSelf: "center",
                marginVertical: 30,
                borderRadius: 40,
                padding: 10,
                justifyContent: "center",
                paddingHorizontal: 40,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={SaveProfile}
              style={{
                alignItems: "center",
                backgroundColor: "#3061e4",
                alignSelf: "center",
                marginVertical: 30,
                borderRadius: 40,
                padding: 10,
                justifyContent: "center",
                paddingHorizontal: 40,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 30,
  },
});
