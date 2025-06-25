import { Slot, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Button } from 'react-native';
import '../app/global.css';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import useLogout from '../hooks/useLogout';

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
      <View className="flex-1 px-4 pt-8">
        <Slot />
        {isLoggedIn && (
          <View className="mt-4">
            <Button title="Logout" onPress={logout} />
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}
