// hooks/useLogout.ts
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function useLogout() {
  const router = useRouter();

  return async () => {
    await SecureStore.deleteItemAsync('token');
    router.replace('/login');
  };
}
