import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Nav, { AuthStack } from "./Navigation";
import { AuthProvider } from "./AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Nav />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
