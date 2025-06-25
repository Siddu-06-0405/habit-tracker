import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import API from "../../utils/api";
import * as SecureStore from 'expo-secure-store';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSignup = async () => {
    const res = await API.post('/auth/signup', form);
    await SecureStore.setItemAsync('token', res.data.token);
    router.replace('../habits');
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={(v) => setForm({ ...form, name: v })} />
      <TextInput placeholder="Email" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}
