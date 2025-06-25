import { Text, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold text-blue-500 mb-4">Welcome to Habit Tracker</Text>
      <Button title="View My Habits" onPress={() => router.push('/habits')} />
    </View>
  );
}