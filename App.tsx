import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import { NativeModules } from "react-native";

const { BluetoothModule } = NativeModules;

const App = () => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(null);

  const toggleBluetooth = async (value:any) => {
    try {
      if (value) {
        const result = await BluetoothModule.enableBluetooth();
        Alert.alert("Bluetooth Enabled", result ? "Enabled Successfully" : "Already Enabled");
      } else {
        const result = await BluetoothModule.disableBluetooth();
        Alert.alert("Bluetooth Disabled", result ? "Disabled Successfully" : "Already Disabled");
      }
      setBluetoothEnabled(value);
    } catch (error) {
      Alert.alert("Error", error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Control</Text>
      <View style={styles.toggleContainer}>
        <Text>Bluetooth is {bluetoothEnabled ? "Enabled" : "Disabled"}</Text>
        <Switch value={bluetoothEnabled} onValueChange={toggleBluetooth} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default App;
