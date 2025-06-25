import { View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import API from '../utils/api';
import * as SecureStore from 'expo-secure-store';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await API.post('/auth/signup', form);
      await SecureStore.setItemAsync('token', res.data.token);
      router.replace('/');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <View className="flex-1 bg-blue-50 px-6 pt-20 gap-4">
      <Text className="text-2xl font-bold">Sign Up</Text>
      {error && <Text className="text-red-500">{error}</Text>}
      <TextInput className="border p-2" placeholder="Name" onChangeText={(v) => setForm({ ...form, name: v })} />
      <TextInput className="border p-2" placeholder="Email" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput className="border p-2" placeholder="Password" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Already have an account? Login" onPress={() => router.push('/login')} />
    </View>
  );
}