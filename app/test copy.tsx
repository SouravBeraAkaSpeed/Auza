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
import BluetoothClassic, { BluetoothDevice, BluetoothDeviceReadEvent } from 'react-native-bluetooth-classic';
import { Feather, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


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
  const [connectedDevice, setConnectedDevice] = useState<any>(null);
  const [deviceList, setDeviceList] = useState<BluetoothDevice[]>([]);
  const [devicesAvailable, setDevicesAvailable] = useState<{ name: string, address: string }[]>([])

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


      if (devices) {

        setDevicesAvailable(() => devices.map((device) => {

          return {
            name: device?.name, address: device?.address
          }
        }))


        const device = devices.find(d => d?.name === 'auza-transmitter');
        if (device) {
          const deviceInstance = await BluetoothClassic.connectToDevice(device.address);
          setConnectedDevice(deviceInstance);

          deviceInstance.onDataReceived((data: BluetoothDeviceReadEvent) => {
            const receivedMessage = data.data;
            setChatMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'ESP32', text: receivedMessage },
            ]);
          });

          console.log("Connected to device:", device?.name);
        }
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
    <View className="rounded-lg p-3 mb-2">
      <Text classname="text-white">
      <Text className="font-bold">{item.sender}:</Text> {item.text}
      </Text>
    </View>
  );

  const renderdevices = ({ item }: { item: { name: string, address: string } }) => (
    <View classname="bg-gray-700 rounded-lg p-3 mb-2">
      <Text clasname="text-white">
        {item?.name} {item?.name === connectedDevice?.name && "( CONNECTED )"}
      </Text>
      <Text classname="text-gray-400 text-xs">Uuid :  {item?.address} </Text> 
    </View>
  )

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
    <SafeAreaView className="flex-1 h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
      <View className="flex-1 p-4">
      <TouchableOpacity 
        onPress={scanForDevices}
        className="my-10 bg-black rounded-xl py-4 px-4 mb-4 shadow"
      >
        <Text className="text-white text-center font-semibold font-bold">Scan for Devices</Text>
      </TouchableOpacity>

      <Text className="text-white text-lg font-semibold mb-2">Devices</Text>
      {devicesAvailable.length > 0 ? <FlatList
        data={devicesAvailable}
        renderItem={renderdevices}
        keyExtractor={(item, index) => index.toString()}
        className="max-h-32 mb-4"
        showsVerticalScrollIndicator={true}
      /> : <Text className="text-gray-400 text-center mb-4">
        No Device available
      </Text>}

      <Text className="text-white text-lg font-semibold mb-2">
        Messages
      </Text>

      {chatMessages.length > 0 ? <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}

      /> : <Text className="text-gray-400 text-center mb-4">
        No Message available
      </Text>}

      {/* <View className="flex-row items-center">
        <TextInput
          value={message}
          onChangeText={setMessage}
          className="flex-1 bg-white rounded-lg px-4 py-2 mr-2"
          placeholderTextColor="#9CA3AF"
          placeholder='Type a message...'
        />

        <TouchableOpacity onPress={sendMessage} className="bg-green-500 rounded-lg py-2 px-4">
          <Text className="rounded-lg py-2 px-4">Send</Text>
        </TouchableOpacity>
        
      </View> */}
      </View>

      <View className="h-20 px-4 py-2 relative shadow shadow-black/50 flex-row items-center">
          
          <TextInput
            className="flex-1 h-full bg-white rounded-full px-4 pr-12 shadow shadow-black/50"
            placeholder="Type Message..."
            value={message}
            onChangeText={setMessage}
          />
          
  
          <TouchableOpacity
            className="absolute -translate-y-1/2 right-20 group z-20"
            activeOpacity={0.5}
            onPress={attachHandler}
          >
            <Entypo name="attachment" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="absolute -translate-y-1/2 right-10 group z-20"
            activeOpacity={0.5}
            onPress={sendMessage}
          >
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

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
