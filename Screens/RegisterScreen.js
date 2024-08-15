import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = (phone) => {
    if (phone.length > 10) {
      setPhoneError("Phone number must be 10 digits or less");
    } else {
      setPhoneError("");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async () => {
    validateEmail(email);
    validatePhone(phone);

    if (!emailError && !phoneError && username && password) {
      setLoading(true);
      const user = {
        name: username,
        email: email,
        number: phone,
        password: password,
      };
      try {
        await axios.post(
          "https://waste-recycle-app-backend.onrender.com/register",
          user
        );
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
        setLoading(false);
        // navigation.navigate("Home");
      } catch (error) {
        setLoading(false);
        Alert.alert(
          "Registration failed",
          "An error occurred during registration"
        );
        console.error("Registration error caused wen ", error);
      }

      setTimeout(() => {
        setLoading(false);
        alert("Account created successfully!");
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 15,
          alignItems: "center",
          backgroundColor: "white",
          elevation: 10,
          borderRadius: 10,
          marginHorizontal: 20,
          width: "90%",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          Create an account
        </Text>

        {/* Username Input */}
        <View
          style={{
            width: "100%",
            height: 60,
            padding: 15,
            borderWidth: 0.5,
            borderColor: "lightgrey",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <AntDesign name="user" size={24} color="grey" />
          <TextInput
            style={{ width: "100%", marginLeft: 10, fontSize: 16 }}
            placeholder="User Name"
            onChangeText={setUsername}
          />
        </View>

        {/* Email Input */}
        <View
          style={{
            width: "100%",
            height: 60,
            padding: 15,
            borderWidth: 0.5,
            borderColor: emailError ? "red" : "lightgrey",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <MaterialCommunityIcons name="email-outline" size={24} color="grey" />
          <TextInput
            style={{ width: "100%", marginLeft: 10, fontSize: 16 }}
            placeholder="Email address"
            onChangeText={setEmail}
            onBlur={() => validateEmail(email)}
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}

        {/* Phone Input */}
        <View
          style={{
            width: "100%",
            height: 60,
            padding: 15,
            borderWidth: 0.5,
            borderColor: phoneError ? "red" : "lightgrey",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Feather name="phone" size={24} color="grey" />
          <TextInput
            style={{ width: "100%", marginLeft: 10, fontSize: 16 }}
            placeholder="Tel number (+256)"
            keyboardType="numeric"
            onChangeText={setPhone}
            onBlur={() => validatePhone(phone)}
          />
        </View>
        {phoneError ? <Text style={{ color: "red" }}>{phoneError}</Text> : null}

        {/* Password Input */}
        <View
          style={{
            width: "100%",
            height: 60,
            padding: 15,
            borderWidth: 0.5,
            borderColor: "lightgrey",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Fontisto name="locked" size={24} color="grey" />
          <TextInput
            style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            borderRadius: 10,
            backgroundColor: "black",
            marginVertical: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Create account</Text>
          )}
        </TouchableOpacity>

        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            width: 325,
            padding: 10,
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Text>Have an account?</Text>
          <Text onPress={() => navigation.goBack()}>Login</Text>
        </View>

        {/* Divider */}
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 0.5,
              width: 80,
              borderWidth: 0.5,
              borderColor: "lightgrey",
              marginRight: 10,
            }}
          />
          <Text style={{ marginVertical: 15, color: "grey", fontSize: 16 }}>
            Or Continue with
          </Text>
          <View
            style={{
              height: 0.5,
              width: 80,
              borderWidth: 0.5,
              borderColor: "lightgrey",
              marginLeft: 10,
            }}
          />
        </View>

        {/* Google & Apple Buttons */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "45%",
              height: 50,
              borderRadius: 10,
              backgroundColor: "whitesmoke",
              flexDirection: "row",
              marginVertical: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              style={{ marginRight: 10 }}
              name="apple1"
              size={24}
              color="black"
            />
            <Text style={{ alignSelf: "center", flex: 1, fontSize: 18 }}>
              Apple
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "45%",
              height: 50,
              borderRadius: 10,
              backgroundColor: "whitesmoke",
              flexDirection: "row",
              marginVertical: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              style={{ marginRight: 10 }}
              name="google"
              size={24}
              color="black"
            />
            <Text style={{ alignSelf: "center", flex: 1, fontSize: 18 }}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
