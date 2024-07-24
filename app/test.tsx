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
import BluetoothClassic, { BluetoothDevice, BluetoothDeviceReadEvent } from 'react-native-bluetooth-classic';

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


        const device = devices.find(d => d?.name === 'ESP32Test');
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
    <View>
      <Text style={{ color: "white" }}>
        {item.sender}: {item.text}
      </Text>
    </View>
  );

  const renderdevices = ({ item }: { item: { name: string, address: string } }) => (
    <View>
      <Text style={{ color: "white", paddingTop: 10 }}>
        {item?.name}  , Uuid :  {item?.address} {item?.name === connectedDevice?.name && "( CONNECTED )"}
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "black" }}>
      <Text style={{ color: "white", margin: "auto", marginVertical: 20 }}>
        Auza Network Test Interface
      </Text>
      <Button title="Scan for Devices" onPress={scanForDevices} />
      <Text style={{ color: "white", marginVertical: 20 }}>
        Devices
      </Text>


      {devicesAvailable.length > 0 ? <FlatList
        data={devicesAvailable}
        renderItem={renderdevices}
        keyExtractor={(item, index) => index.toString()}
        style={{ maxHeight: 110 }}
        showsVerticalScrollIndicator={true}
      /> : <Text style={{ color: "gray", margin: "auto", marginVertical: 20 }}>
        No Device available
      </Text>}

      <Text style={{ color: "white", marginVertical: 20 }}>
        Messages
      </Text>

      {chatMessages.length > 0 ? <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}

      /> : <Text style={{ color: "gray", margin: "auto", marginVertical: 20 }}>
        No Message available
      </Text>}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            borderColor: 'gray',
            borderWidth: 1,
            marginRight: 10,
            color: "white",
            padding: 10
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
