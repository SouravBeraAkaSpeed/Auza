import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const Intro = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [displayedText, setDisplayedText] = useState('');
  const textOpacity = useRef(new Animated.Value(0)).current;
  const texts = ["Welcome.", "Your Disaster AID AI."];
  const currentTextIndex = useRef(0);
  const currentCharIndex = useRef(0);

  const animateText = () => {
    currentCharIndex.current = 0;
    setDisplayedText('');
    textOpacity.setValue(0);

    const typeText = () => {
      if (currentCharIndex.current < texts[currentTextIndex.current].length) {
        setDisplayedText(prev => prev + texts[currentTextIndex.current][currentCharIndex.current]);
        currentCharIndex.current++;
        setTimeout(typeText, 100);
      } else {
        fadeOut();
      }
    };

    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(typeText);
  };

  const fadeOut = () => {
    setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        currentTextIndex.current = (currentTextIndex.current + 1) % texts.length;
        animateText();
      });
    }, 1000);
  };

  useEffect(() => {
    animateText();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/logonew.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.typedText, { opacity: textOpacity }]}>
          {displayedText}
        </Animated.Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => console.log('Button pressed')}>
          <LinearGradient
          // Button Linear Gradient
          colors={['aqua','#a503fc']}
          start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
           style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Button pressed')}>
          <LinearGradient
          // Button Linear Gradient
          colors={['aqua','#a503fc']}
          start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
           style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('index')}>
          <Text style={styles.buttonText2}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  typedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    width: 370,
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LinearGradientButton: {
    
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
    
  }
});

export default Intro;