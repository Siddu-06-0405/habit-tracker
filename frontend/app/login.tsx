import { View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import API from '../utils/api';
import * as SecureStore from 'expo-secure-store';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', form);
      await SecureStore.setItemAsync('token', res.data.token);
      router.replace('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View className="flex-1 bg-blue-50 px-6 pt-20 gap-4">
      <Text className="text-2xl font-bold">Login</Text>
      {error && <Text className="text-red-500">{error}</Text>}
      <TextInput className="border p-2" placeholder="Email" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput className="border p-2" placeholder="Password" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account? Sign up" onPress={() => router.push('/signup')} />
    </View>
  );
}