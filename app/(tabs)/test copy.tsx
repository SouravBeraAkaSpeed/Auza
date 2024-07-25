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
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { BleManager, Device, State } from 'react-native-ble-plx';
import { Feather, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from 'buffer';

const manager = new BleManager();

const requestBluetoothPermissions = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  if (Platform.OS === 'android') {
    const granted_bluetooth_scan = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
    );

    const granted_bluetooth_connect = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
    );

    return (granted_bluetooth_scan === PermissionsAndroid.RESULTS.GRANTED && granted_bluetooth_connect === PermissionsAndroid.RESULTS.GRANTED);
  }
  return false;
};

const HomeScreen = () => {
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{ sender: string, text: string }[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [devicesAvailable, setDevicesAvailable] = useState<{ name: string, id: string }[]>([]);

  useEffect(() => {
    requestBluetoothPermissions().then((granted) => {
      if (granted) {
        scanForDevices();
      }
    });

    return () => {
      if (connectedDevice) {
        connectedDevice.cancelConnection();
      }
      manager.destroy();
    };
  }, []);

  const scanForDevices = async () => {
    try {
      manager.onStateChange((state) => {
        if (state === State.PoweredOn) {
          manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
              console.error("Scan error:", error);
              return;
            }

            if (device && !devicesAvailable.find(d => d.id === device.id) && device.name?.includes("AUZA-NODE")) {
              setDevicesAvailable((prevDevices) => [
                ...prevDevices,
                { name: device.name || 'Unknown', id: device.id }
              ]);
            }
          });
        }
      }, true);
    } catch (error) {
      console.error("Scan or connect error:", error);
    }
  };

  const connectToDevice = async (deviceId: string) => {
    try {
      const device = await manager.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      setConnectedDevice(device);

      device.monitorCharacteristicForService('4fafc201-1fb5-459e-8fcc-c5c9c331914b', 'beb5483e-36e1-4688-b7f5-ea07361b26a8', (error, characteristic) => {
        if (error) {
          console.error("Monitor error:", error);
          return;
        }

        const receivedMessage = characteristic?.value;
        if (receivedMessage) {
          const messageText = Buffer.from(receivedMessage, 'base64').toString('ascii');
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'ESP32', text: messageText.replace("Broadcast:", "") },
          ]);
        }
      });

      console.log("Connected to device:", deviceId);
    } catch (error) {
      console.error("Connect error:", error);
    }
  };

  const sendMessage = async () => {
    if (connectedDevice && message) {
      try {
        const serviceUUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
        const characteristicUUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
        await connectedDevice.writeCharacteristicWithResponseForService(
          serviceUUID,
          characteristicUUID,
          Buffer.from(message).toString('base64')
        );
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
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>
        <Text style={styles.senderText}>{item.sender}:</Text> {item.text}
      </Text>
    </View>
  );

  const renderDevices = ({ item }: { item: { name: string, id: string } }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>
        {item.name} {item.id === connectedDevice?.id && "( CONNECTED )"}
      </Text>
      <Text style={styles.deviceId}>Uuid: {item.id}</Text>
      <TouchableOpacity onPress={() => connectToDevice(item.id)} style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  const attachHandler = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri); 
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex1}
      >
        <View style={styles.flex1}>
          <TouchableOpacity
            onPress={scanForDevices}
            style={styles.scanButton}
          >
            <Text style={styles.scanButtonText}>Scan for Devices</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Devices</Text>
          {devicesAvailable.length > 0 ? (
            <FlatList
              data={devicesAvailable}
              renderItem={renderDevices}
              keyExtractor={(item, index) => item.name + index}
              style={styles.deviceList}
            />
          ) : (
            <Text style={styles.noDeviceText}>No Device available</Text>
          )}

          <Text style={styles.title}>Messages</Text>
          {chatMessages.length > 0 ? (
            <FlatList
              data={chatMessages}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.sender + index.toString()}
            />
          ) : (
            <Text style={styles.noMessageText}>No Message available</Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type Message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity
              style={styles.attachmentButton}
              activeOpacity={0.5}
              onPress={attachHandler}
            >
              <Entypo name="attachment" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendButton}
              activeOpacity={0.5}
              onPress={sendMessage}
            >
              <Feather name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  flex1: {
    flex: 1,
  },
  scanButton: {
    backgroundColor: 'black',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  scanButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deviceList: {
    maxHeight: 128,
    marginBottom: 16,
  },
  deviceContainer: {
    backgroundColor: '#4A4A4A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  deviceText: {
    color: 'white',
  },
  deviceId: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#007BFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  connectButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  messageText: {
    color: 'white',
  },
  senderText: {
    fontWeight: 'bold',
  },
  noDeviceText: {
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 16,
  },
  noMessageText: {
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    height: 80,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  textInput: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingRight: 60,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  attachmentButton: {
    position: 'absolute',
    right: 60,
  },
  sendButton: {
    position: 'absolute',
    right: 16,
  },
});

export default HomeScreen;