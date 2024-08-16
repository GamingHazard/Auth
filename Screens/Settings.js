import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text> Settings Screen </Text>
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

export default SettingsScreen;
