import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "whitesmoke" },
});
