import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");

  const { login } = useContext(AuthContext);

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    validateEmail(email);

    if (!emailError && email && password) {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // alert("Login successful!");
        login(email, password);
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
        <Text style={{ fontWeight: "bold", fontSize: 25, marginVertical: 15 }}>
          Sign in to your account
        </Text>

        {/* Email Input */}
        <View
          style={{
            width: "100%",
            height: 60,
            padding: 15,
            borderWidth: 0.5,
            borderColor: emailError ? "red" : "lightgrey",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons name="email-outline" size={24} color="grey" />
          <TextInput
            style={{ width: "100%", marginLeft: 10, fontSize: 16 }}
            placeholder="Email address"
            onChangeText={(text) => setEmail(text)}
            onBlur={() => validateEmail(email)}
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}

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
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>

        <Text style={{ marginVertical: 20 }}>Forgot password?</Text>

        {/* Submit button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
          )}
        </TouchableOpacity>

        {/* title */}
        <View style={styles.continueWithContainer}>
          <View style={styles.separator} />
          <Text style={{ marginVertical: 15, color: "grey" }}>
            Or Continue with
          </Text>
          <View style={styles.separator} />
        </View>

        {/* Google & Apple buttons */}
        <View style={styles.authButtonsContainer}>
          <TouchableOpacity style={styles.authButton}>
            <AntDesign
              style={{ marginRight: 10 }}
              name="apple1"
              size={24}
              color="black"
            />
            <Text style={styles.authButtonText}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton}>
            <AntDesign
              style={{ marginRight: 10 }}
              name="google"
              size={24}
              color="black"
            />
            <Text style={styles.authButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Not a member?</Text>
        <Text onPress={() => navigation.navigate("Register")}>
          Create an account
        </Text>
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
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 30,
    backgroundColor: "black",
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  continueWithContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-evenly",
    marginVertical: 15,
    alignItems: "center",
  },
  separator: {
    height: 0.5,
    width: 80,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  authButton: {
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: "whitesmoke",
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  authButtonText: {
    alignSelf: "center",
    flex: 1,
    fontSize: 18,
  },
  footer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: 15,
    flexDirection: "row",
    marginVertical: 20,
  },
});

export default LoginScreen;
