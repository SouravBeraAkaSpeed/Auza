import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SETTINGS = [
  { label: "Notifications", href: "/settings/notifications", icon: "notifications-outline" },
  { label: "Settings", href: "/settings/settings", icon: "settings-outline" },
  { label: "Languages", href: "/settings/languages", icon: "language-outline" },
];

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const user = {
    username: "Auza User",
    email: "auzauser@auza.com",
    avatar: require("@/assets/images/profilepic.jpeg"),
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ position: 'relative', height: height * 0.5 }}>
          <Image
            source={user.avatar}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
              justifyContent: 'flex-end',
              paddingHorizontal: 20,
              paddingBottom: 15,
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{user.username}</Text>
          </LinearGradient>
        </View>

        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 20,
              alignSelf: 'flex-start',
              marginBottom: 20,
            }}
          >
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: 'white', borderRadius: 20, overflow: 'hidden' }}>
            {SETTINGS.map((setting, index) => (
              <Link key={setting.label} href={setting.href} asChild>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    borderBottomWidth: index === SETTINGS.length - 1 ? 0 : 1,
                    borderBottomColor: '#f0f0f0',
                  }}
                >
                  <Ionicons name={setting.icon} size={24} color="black" style={{ marginRight: 20 }} />
                  <Text style={{ flex: 1, fontSize: 16 }}>{setting.label}</Text>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
              </Link>
            ))}
          </View>

          <Text style={{ textAlign: 'center', marginTop: 20, color: 'grey' }}>
            Powered by <Text style={{ fontWeight: 'bold', color: 'black' }}>auza</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;