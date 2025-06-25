import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import API from '../utils/api';
import { PlusCircle } from 'lucide-react-native';

export default function CreateHabit() {
  const [form, setForm] = useState({ title: '', description: '', frequency: 'daily' });
  const router = useRouter();

  const handleCreate = async () => {
    await API.post('/habits', form);
    router.replace('/habits');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-blue-50 px-6 pt-20"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="bg-white p-6 rounded-2xl shadow-md">
        <Text className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Create New Habit
        </Text>

        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
          placeholder="Title"
          onChangeText={(v) => setForm({ ...form, title: v })}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-base"
          placeholder="Description"
          multiline
          onChangeText={(v) => setForm({ ...form, description: v })}
        />

        <TouchableOpacity
          onPress={handleCreate}
          className="bg-blue-600 py-4 px-6 rounded-full flex-row justify-center items-center"
        >
          <PlusCircle size={20} color="white" className="mr-2" />
          <Text className="text-white font-semibold text-lg">Create Habit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
