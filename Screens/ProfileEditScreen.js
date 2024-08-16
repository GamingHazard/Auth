import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import EvilIcons from "@expo/vector-icons/EvilIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import ModalView from "./components/Modal";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileEditScreen = ({ cancel }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const ShowModal = () => {
    setModalVisible(true);
  };
  const HideModal = () => {
    setModalVisible(false);
  };

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
          // backgroundColor: "lightgreen",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        ></View>
      </View>
      <ScrollView style={{ flex: 1, width: "50%" }}>
        {/* Profile pic  */}
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
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>
            Edit {""}Profile
          </Text>

          <View
            style={{
              height: "68%",
              width: "55%",
              borderRadius: 70,
              borderWidth: 2,
              borderColor: "#3061e4",
              padding: 4,
              marginVertical: 10,
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../assets/me.jpg")}
              style={{ width: "100%", height: "100%", borderRadius: 70 }}
            />
          </View>
          <Fontisto
            onPress={ShowModal}
            style={{ left: 38, top: -38 }}
            name="camera"
            size={25}
            color="#3061e4"
          />
        </View>

        {/* Modal  */}
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
                style={{ alignSelf: "flex-end" }}
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
                {/* Select image by gallery */}
                <TouchableOpacity
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="images" size={35} color="#3061e4" />
                  <Text>Gallery</Text>
                </TouchableOpacity>
                {/* Select image by gallery */}
                <TouchableOpacity
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="camera" size={35} color="#3061e4" />
                  <Text>Camera</Text>
                </TouchableOpacity>

                {/* delete image */}
                <TouchableOpacity
                  style={{
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
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

        {/* line */}
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

        {/* inputs */}
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
            <TextInput style={{ paddingLeft: 10 }} placeholder="@username" />
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
              placeholder="email@gmail.com"
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
            <TextInput style={{ paddingLeft: 10 }} placeholder="(+256)...." />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, left: 40 }}>
            Password
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
            <TextInput style={{ paddingLeft: 10 }} placeholder="password..." />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 10,
              padding: 10,
              width: "60%",
              alignSelf: "center",
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
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#3061e4",
                alignSelf: "center",
                marginVertical: 30,
                borderRadius: 40,
                padding: 10,
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 25,
    width: "100%",
    // backgroundColor: "lightgreen",
  },
});

export default ProfileEditScreen;
