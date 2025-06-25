import { Slot, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Text } from 'react-native';
import '../app/global.css';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import useLogout from '../hooks/useLogout';
import { LogOutIcon } from "lucide-react-native";

export default function Layout() {
  const segments = useSegments();
  const router = useRouter();
  const logout = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('token');
      const currentPath = '/' + segments.join('/');
      const isAuthScreen = currentPath === '/login' || currentPath === '/signup';

      if (token) {
        setIsLoggedIn(true);
        if (isAuthScreen) {
          router.replace('/');
        }
      } else {
        setIsLoggedIn(false);
        if (!isAuthScreen) {
          router.replace('/login');
        }
      }
    };

    checkAuth();
  }, [segments]);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View className="flex-1 bg-white pt-16 px-4">
        
        {/* Logout top right */}
        {isLoggedIn && (
          <View className="flex-row justify-end items-center mb-4">
            <TouchableOpacity
              onPress={logout}
              className="flex-row items-center gap-2 bg-red-100 px-4 py-2 rounded-full"
            >
              <LogOutIcon size={18} color="#dc2626" />
              <Text className="text-red-600 font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
