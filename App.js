import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Nav, { AuthStack } from "./Navigation";
import { AuthProvider } from "./Screens/context/AuthContext";
import ModalView from "./Screens/components/Modal";
export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Nav />
        {/* <ModalView /> */}
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
