import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import API from "../../utils/api";
import * as SecureStore from 'expo-secure-store';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = async () => {
    const res = await API.post('/auth/login', form);
    await SecureStore.setItemAsync('token', res.data.token);
    router.replace('../habits');
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
