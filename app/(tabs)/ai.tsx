import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AuzaChat = () => {
    const [messages, setMessages] = useState<{ id: string, text: string, sender: string }[]>([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList<{ id: string, text: string, sender: string }>>(null);

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const newUserMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
        };

        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setInputText('');

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: (Date.now() + 1).toString(),
                text: "Hi, I am auza. How can I help you?",
                sender: 'ai',
            };
            setMessages(prevMessages => [...prevMessages, aiResponse]);
        }, 1000);
    };

    const renderMessage = ({ item }: {
        item: {
            id: string;
            text: string;
            sender: string;
        }
    }) => (
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
            {item.sender === 'ai' && <Image
                source={require('@/assets/logoaiblack.png')}
                style={styles.logo}
            />}
            <View style={[styles.messageContent, item.sender === 'ai' && styles.aiMessageContent]}>
                <Text style={styles.senderName}>{item.sender === 'user' ? 'You' : 'auza'}</Text>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>auzaai</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                {messages.length > 0 && (

                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        style={styles.messageList}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    />
                )}

                {messages.length === 0 && <Text style={styles.messageList}>Ask Anything</Text>}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message..."
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        paddingTop: 10,
    },
    header: {
        height: 100,
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100%',
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight: '900',
        left: 15,
        top: 10,
    },
    messageList: {
        flex: 1,
        padding: 10,
        color:'white',
        margin:"auto",
        alignSelf:"center"
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    aiMessage: {
        justifyContent: 'flex-start',
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    logomain: {
        top: 5,
        width: 100,
        height: 50,
        left: 5,
    },
    messageContent: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    aiMessageContent: {
        backgroundColor: 'black',
        padding: 0,
    },
    senderName: {
        color: '#888',
        fontSize: 12,
        marginBottom: 5,
    },
    messageText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#111',
    },
    input: {
        flex: 1,
        borderWidth: 0,
        borderColor: '#333',
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#fff',
    },
    sendButton: {
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AuzaChat;
