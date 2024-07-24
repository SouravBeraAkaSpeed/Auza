import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, Share, Modal, Button } from "react-native";

interface NewsFeedItem {
  posted_by: string;
  avatar: any;
  image: any;
  title: string;
  description: string;
}

interface NewsCardProps {
  data: NewsFeedItem;
}

const NewsCard = ({ data }: NewsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${data.title}\n\n${data.description}`,
        url: data.image,
        title: data.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View className="mb-12 border-t border-black/5">
      <View className="flex-row h-14 px-4 items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Image
            source={data.avatar}
            className="w-7 h-7 rounded-full"
            resizeMode="contain"
          />
          <Text className="font-psemi">{data.posted_by}</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="items-center">
        <Image
          source={data.image}
          className="w-9/10 h-60 rounded-xl"
          style={{ width: '93%' }}
          resizeMode="cover"
        />
      </View>
      <View className="flex-row h-12 justify-between px-4 items-center">
        <TouchableOpacity onPress={toggleLike}>
          {isLiked ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={toggleBookmark}>
            {isBookmarked ? (
              <Ionicons name="bookmark" size={24} color="black" />
            ) : (
              <Ionicons name="bookmark-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-social" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-4">
        <Text className="font-psemi">{data.title}</Text>
        <Text className="font-pregular">
          {isExpanded
            ? data.description
            : `${data.description.slice(0, 120)}... `}
          <Text className="black font-bold" onPress={toggleDescription}>
            {isExpanded ? " Read Less" : "Read More"}
          </Text>
        </Text>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-lg p-4 shadow-lg">
            <TouchableOpacity
              className="bg-white py-3 px-4 rounded-lg shadow mb-2"
              onPress={() => {
                console.log("Not Interested clicked");
                toggleModal();
              }}
            >
              <Text className="text-center text-black">Not Interested</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white py-3 px-4 rounded-lg shadow mb-2"
              onPress={() => {
                console.log("Report clicked");
                toggleModal();
              }}
            >
              <Text className="text-center text-black">Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white py-3 px-4 rounded-lg shadow"
              onPress={toggleModal}
            >
              <Text className="text-center text-black">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewsCard;
