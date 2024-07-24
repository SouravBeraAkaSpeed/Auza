import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Keyboard, GestureResponderEvent, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactItem = ({ name, icon, onPress }: {
    name: string;
    icon: ImageSourcePropType | undefined;
    onPress: ((event: GestureResponderEvent) => void) | undefined
}) => (
    <TouchableOpacity style={styles.contactItem} onPress={onPress}>
        <Image source={icon} style={styles.contactIcon} />
        <Text style={styles.contactName}>{name}</Text>
    </TouchableOpacity>
);

const ChatbotScreen = () => {
    const [messages, setMessages] = useState<{
        id: string;
        text: string;
        sender: string;
        name: string;
        time: string;
    }[]>([]);
    const [inputText, setInputText] = useState('');
    const [headerText, setHeaderText] = useState('Chat');
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const flatListRef = useRef<FlatList<{
        id: string,
        text: string,
        sender: string,
        name: string,
        time: string
    }>>(null);

    const [contacts, setContacts] = useState<{ id: string, name: string, icon: ImageSourcePropType | undefined }[]>([])



    useEffect(() => {
        const keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
        const keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

        const contacts = [
            { id: '1', name: 'Doctor', icon: require('@/assets/doctor.png') },
            { id: '2', name: 'Police', icon: require('@/assets/policeman.png') },
            { id: '3', name: 'Fire', icon: require('@/assets/firefighter.png') },
        ];

        setContacts(contacts)

        return () => {
            keyboardWillShowSub.remove();
            keyboardWillHideSub.remove();
        };
    }, []);

    const keyboardWillShow = (event: any) => {
        setKeyboardHeight(event.endCoordinates.height);
    };

    const keyboardWillHide = () => {
        setKeyboardHeight(0);
    };

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            name: 'You',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const botReply = {
            id: (Date.now() + 1).toString(),
            text: `Reply to: ${inputText}`,
            sender: 'bot',
            name: headerText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prevMessages => [newMessage, botReply, ...prevMessages]);
        setInputText('');
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    const renderMessage = ({ item }: {
        item: {
            id: string;
            text: string;
            sender: string;
            name: string;
            time: string;
        }
    }) => (
        <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageName}>{item.name}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    const handleContactPress = (event: GestureResponderEvent, contactName: string) => {
        setHeaderText(contactName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{headerText}</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.contactsContainer}>
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            name={contact.name}
                            icon={contact.icon}
                            onPress={(e) => handleContactPress(e, contact.name)}
                        />
                    ))}
                </View>
                <View style={styles.chatContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.messageList}
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
                        style={[styles.inputContainer, { marginBottom: keyboardHeight }]}
                    >
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
                    </KeyboardAvoidingView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: 'black',
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
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
    contactsContainer: {
        width: 70,
        backgroundColor: '#222',
        paddingTop: 20,
        alignItems: 'center',
    },
    contactItem: {
        alignItems: 'center',
        marginBottom: 20,
    },
    contactIcon: {
        width: 30,
        height: 30,
        borderRadius: 25,
    },
    contactName: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    messageList: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#333',
    },
    messageName: {
        color: 'white',
        fontSize: 12,
        marginBottom: 5,
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    messageTime: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#111',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
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

export default ChatbotScreen;