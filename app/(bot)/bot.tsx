import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, {useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Feather, Entypo } from "@expo/vector-icons";
import { DUMMY_DATA } from "@/constants/content/messages";
import Message from "@/components/message";
import ChatEmpty from "@/components/chat-empty";

const BotPage = () => {
  const [image, setImage] = useState(null);

  const sortedData = DUMMY_DATA.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  const sendhandler = () => {};

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
    <SafeAreaView className="h-full">
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <View className="w-full">
            <Message data={item} />
          </View>
        )}
        ListEmptyComponent={() => <ChatEmpty />}
        inverted={DUMMY_DATA.length < 0}
        scrollsToTop
        className="h-full px-4"
      />
      <View className="h-20 px-4 py-2 relative bg-white">
        <TextInput
          className="h-full w-full rounded-full px-4 pr-12 bg-white"
          placeholder="Ask auza anything"
        />
        <TouchableOpacity
          className="absolute top-1/2 -translate-y-1/2 right-20 group z-20"
          activeOpacity={0.5}
          onPress={attachHandler}
        >
          <Entypo name="attachment" size={24} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity
          className="absolute top-1/2 -translate-y-1/2 right-10 group"
          activeOpacity={0.5}
          onPress={sendhandler}
        >
          <Feather name="send" size={24} color="#666666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BotPage;
