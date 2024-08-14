import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default class WelcomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        ></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            width: "100%",
            height: 70,
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            elevation: 10,
            backgroundColor: "white",
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 26 }}>
            Get started
          </Text>
          <Feather name="arrow-right-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
  },
});
