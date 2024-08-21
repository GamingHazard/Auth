import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const ResetPasswordScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading

  const { token } = route.params || {};

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true); // Show the loader

    try {
      const response = await axios.patch(
        `https://demo-backend-85jo.onrender.com/reset-password/${token}`,
        { password }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Password has been updated successfully");
        navigation.navigate("Login"); // Redirect to the login screen after a successful reset
      }
    } catch (error) {
      console.error("Error resetting password", error);
      Alert.alert("Error", "Failed to reset password. Please try again.");
    } finally {
      setLoading(false); // Hide the loader
    }
  };

  return (
    <View style={styles.container}>
      {token ? <Text>Token: {token}</Text> : <Text>No Token Provided</Text>}
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Spinner shown when loading
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
