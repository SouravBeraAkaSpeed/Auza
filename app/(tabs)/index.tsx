import React from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

const HomePage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [fontsLoaded] = useFonts({
        'WorkSans-VariableFont_wght': require('@/assets/fonts/Work_Sans/WorkSans-VariableFont_wght.ttf'),
    });

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    const feedData = [
        {
            id: '1',
            imageSource: require('@/assets/Disasters/india floods 2024.jpg'),
            username: 'India Floods 2024',
            caption: 'The flood affected a portion of the State from 2nd July to 3rd July 2024, with major areas affected including Imphal West, Imphal East, Thoubal, Kangpokpi, Bishnupur, and Senapati. In the hill districts, minor landslides have occurred in various locations, destroying crops and infrastructure due to heavy rainfall.',
        },
        {
            id: '2',
            imageSource: require('@/assets/Disasters/india floods 2023.png'),
            username: 'India Floods 2023',
            caption: 'What happened, where and when? Heavy downpours plagued Himachal Pradesh and Uttarakhand in late August 2023. These intense bursts of rain, known as cloudbursts, unleashed massive amounts of water in a short period, triggering devastating floods.',
        },
        // Add more items as needed
    ];

    const renderFeedItem = ({ item }: {
        item: {
            id: string;
            imageSource: any;
            username: string;
            caption: string;
        }
    }) => (
        <View style={styles.feedItem}>
            <View style={styles.postHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                    <Image
                        source={require('@/assets/logoaiblack.png')}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                <Text style={styles.username}>auza</Text>
            </View>
            <Image
                source={item.imageSource}
                style={styles.feedImage}
                resizeMode="cover"
            />
            <View style={styles.postFooter}></View>
            <Text style={styles.caption}>
                <Text style={styles.username}>{item.username}</Text> {item.caption}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('@/assets/logonew.jpg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Image
                        source={require('@/assets/profilepic.jpeg')}
                        style={styles.userProfileIcon}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={feedData}
                renderItem={renderFeedItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('ai')}
                style={styles.aiButton}>
                <Image
                    source={require('@/assets/logoaiblack.png')}
                    style={styles.logoai}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
    },
    header: {
        paddingVertical: 10,
        borderBottomLeftRadius: 25,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    AuzaText: {
        fontSize: 40,
        fontFamily: 'WorkSans-VariableFont_wght',
        fontWeight: '900',
        color: 'white',
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 10,
    },
    logo: {
        top: 5,
        width: 100,
        height: 50,
        left: 5,
    },
    userProfileIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    welcomeText: {
        fontSize: 32,
        fontFamily: 'WorkSans-VariableFont_wght',
        fontWeight: '100',
        color: 'white',
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: '#999',
        marginLeft: 15,
        marginBottom: 20,
    },
    feedItem: {
        marginBottom: 20,
    },
    logoai: {
        height: 60,
        width: 60,
        borderRadius: 50,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
    },
    feedImage: {
        width: width,
        height: width,
    },
    postFooter: {
        flexDirection: 'row',
        padding: 10,
    },
    likes: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    caption: {
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    aiButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // for Android shadow
        shadowColor: "#000", // for iOS shadow
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    },
});

export default HomePage;
