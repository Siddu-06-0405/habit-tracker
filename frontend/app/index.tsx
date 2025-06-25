import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Flame } from 'lucide-react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      {/* Welcome */}
      <Text className="text-4xl font-extrabold text-blue-600 mb-4 text-center">
        Welcome to Habit Tracker
      </Text>

      {/* Subheading */}
      <Text className="text-gray-600 text-center text-base mb-6 leading-relaxed">
        Your journey to better habits starts here. Track, complete, and stay consistent — one day at a time. 🔁
      </Text>

      {/* Bluff paragraph */}
      <Text className="text-gray-500 text-sm text-center mb-10 leading-relaxed">
        Whether it's exercising, reading, or meditating, this app helps you build routines that last. Join hundreds already achieving more every day.
      </Text>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={() => router.push('/habits')}
        className="bg-blue-600 py-4 px-8 rounded-full flex-row items-center justify-center"
        style={{
          shadowColor: '#3b82f6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Flame size={20} color="white" className="mr-2" />
        <Text className="text-white text-lg font-semibold">View My Habits</Text>
      </TouchableOpacity>
    </View>
  );
}
