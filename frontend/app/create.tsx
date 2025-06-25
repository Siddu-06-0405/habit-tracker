import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import API from '../utils/api';

export default function CreateHabit() {
  const [form, setForm] = useState({ title: '', description: '', frequency: 'daily' });
  const router = useRouter();

  const handleCreate = async () => {
    await API.post('/habits', form);
    router.replace('/habits');
  };

  return (
    <View className="gap-4">
      <TextInput className="border p-2" placeholder="Title" onChangeText={(v) => setForm({ ...form, title: v })} />
      <TextInput className="border p-2" placeholder="Description" onChangeText={(v) => setForm({ ...form, description: v })} />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}