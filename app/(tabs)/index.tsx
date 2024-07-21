import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import BluetoothClassic, { BluetoothDeviceReadEvent, BluetoothEventListener } from 'react-native-bluetooth-classic';

const requestBluetoothPermissions = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return false;
};

const HomeScreen = () => {
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{ sender: string, text: string }[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<any>(null);
  const [deviceList, setDeviceList] = useState<any[]>([]);

  useEffect(() => {
    requestBluetoothPermissions().then((granted) => {
      if (granted) {
        scanForDevices();
      }
    });

    // Cleanup on unmount
    return () => {
      if (connectedDevice) {
        connectedDevice.disconnect();
      }
    };
  }, []);

  const scanForDevices = async () => {
    try {
      const devices = await BluetoothClassic.getBondedDevices();
      setDeviceList(devices);

      const device = devices.find(d => d.name === 'ESP32Test');
      if (device) {
        const deviceInstance = await BluetoothClassic.connectToDevice(device.address);
        setConnectedDevice(deviceInstance);

        deviceInstance.onDataReceived((data : BluetoothDeviceReadEvent) => {
          const receivedMessage = data.data;
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'ESP32', text: receivedMessage },
          ]);
        });

        console.log("Connected to device:", device.name);
      }
    } catch (error) {
      console.error("Scan or connect error:", error);
    }
  };

  const sendMessage = async () => {
    if (connectedDevice && message) {
      try {
        await connectedDevice.write(message + '\n');
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'You', text: message },
        ]);
        setMessage('');
      } catch (error) {
        console.error("Send message error:", error);
      }
    }
  };

  const renderItem = ({ item }: { item: { sender: string, text: string } }) => (
    <View>
      <Text style={{ color: "white" }}>
        {item.sender}: {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: "white", marginTop: 20 }}>
        React native Test App
      </Text>
      <Button title="Scan for Devices" onPress={scanForDevices} />
      <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            borderColor: 'gray',
            borderWidth: 1,
            marginRight: 10,
            color: "white"
          }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default HomeScreen;
