import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet, FlatList, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const ReelItem = ({ images }: { images: any[] }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <View style={styles.reelContainer}>
            <Image
                source={images[currentImageIndex]}
                style={styles.image}
                resizeMode="contain" // cover
            />
            <View style={styles.overlay}>
                <Text style={styles.headerText}>LIVE</Text>
            </View>
            <View style={styles.overlay2}>
                <Text style={styles.descriptionText}>Assam - Heavy Floods, India 2024</Text>
            </View>
        </View>
    );
};

const LiveConcurrentImages = () => {
    const reelsData = [
        {
            id: '1',
            images: [
                require('@/assets/Disasters/india floods 2023.png'),
                require('@/assets/Disasters/india floods 2024.jpg')
            ]
        },
        {
            id: '2',
            images: [
                require('@/assets/Disasters/india floods 2023.png'),
                require('@/assets/Disasters/india floods 2024.jpg')
            ]
        },
    ];

    const renderReel = ({ item }: {
        item: {
            id: string;
            images: any[];
        }
    }) => <ReelItem images={item.images} />;

    return (
        <FlatList
            data={reelsData}
            renderItem={renderReel}
            keyExtractor={(item) => item.id}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            snapToInterval={height}
            snapToAlignment="start"
            decelerationRate="fast"
        />
    );
};

const styles = StyleSheet.create({
    reelContainer: {
        width: width,
        height: height,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        top: 20,
    },
    overlay2: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 20,
        bottom: 30,
    },
    headerText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    descriptionText: {
        color: 'white',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});

export default LiveConcurrentImages;