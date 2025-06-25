import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import API from '../../utils/api';

interface Form {
  title: string;
  description: string;
  frequency: string;
}

export default function CreateHabit() {
  const [form, setForm] = useState<Form>({ title: '', description: '', frequency: 'daily' });
  const router = useRouter();

  const handleCreate = async () => {
    await API.post('/habits', form);
    router.replace('../habits');
  };

  return (
    <View>
      <TextInput placeholder="Title" onChangeText={(v) => setForm({ ...form, title: v })} />
      <TextInput placeholder="Description" onChangeText={(v) => setForm({ ...form, description: v })} />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
}

