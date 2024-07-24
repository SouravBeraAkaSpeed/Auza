import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image 
          source={require('../assets/profilepic.jpeg')} 
          style={styles.profilePic}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.username}>auzauser</Text>
          <Text style={styles.text}>Assam</Text>
          <Text style={styles.text}>Age: 28</Text>
          <Text style={styles.text}>Graduated</Text>
          <Text style={styles.text}>Travel enthusiast</Text>
        </View>
      </ScrollView>
      <Text onPress={() => navigation.navigate('test')} style={{color:"white" , marginHorizontal:"auto",marginVertical:10}}>
        Admin
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollView: {
    flexGrow: 1,
  },
  profilePic: {
    width: width,
    height: height / 2,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  username: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
});

export default ProfileScreen;