import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Plus, Check, Flame } from "lucide-react-native";
import API from "../utils/api";

interface Habit {
  _id: string;
  title: string;
  description?: string;
  streak: number;
  completed?: boolean; // this will be calculated
}


export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchHabits = async () => {
  try {
    const res = await API.get("/habits");

    const habits = await Promise.all(
      res.data.map(async (habit: Habit) => {
        const trackRes = await API.get(`/habits/${habit._id}/tracking`);
        const tracking = trackRes.data;

        // Filter only completed entries
        const completedDates = tracking
          .filter((t: any) => t.completed)
          .map((t: any) => t.date)
          .sort((a, b) => b.localeCompare(a)); // newest to oldest

        // Streak calculation
        let streak = 0;
        let day = new Date();

        for (let i = 0; i < completedDates.length; i++) {
          const expectedDate = new Date();
          expectedDate.setDate(day.getDate() - i);
          const expected = expectedDate.toISOString().split("T")[0];
          if (completedDates.includes(expected)) {
            streak++;
          } else {
            break;
          }
        }

        // Completed today?
        const today = new Date().toISOString().split("T")[0];
        const completed = completedDates.includes(today);

        return { ...habit, completed, streak };
      })
    );

    setHabits(habits);
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};


  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHabits();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const markComplete = async (id: string) => {
    try {
      await API.post(`/habits/${id}/track`);
      await fetchHabits();
    } catch (error) {
      console.error("Error marking habit complete:", error);
    }
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);
  const renderHabit = ({ item }: { item: Habit }) => (
    <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 mr-4">
          <Text
            className={`text-lg font-semibold mb-2 ${
              item.completed ? "text-green-600 line-through" : "text-gray-800"
            }`}
          >
            {item.title}
          </Text>
          {item.description && (
            <Text className="text-gray-600 text-sm leading-5">
              {item.description}
            </Text>
          )}
        </View>
        {item.completed && (
          <View className="bg-green-100 rounded-full p-2">
            <Check size={16} color="#059669" />
          </View>
        )}
      </View>

      {item.streak > 0 && (
        <View className="flex-row items-center mb-4">
          <Flame size={16} color="#f59e0b" />
          <Text className="text-orange-600 font-medium ml-2">
            {item.streak} day streak
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => markComplete(item._id)}
        className={`py-3 px-4 rounded-xl flex-row items-center justify-center ${
          item.completed ? "bg-green-50 border border-green-200" : "bg-blue-500"
        }`}
      >
        <Check
          size={18}
          color={item.completed ? "#059669" : "#ffffff"}
          className="mr-2"
        />
        <Text
          className={`font-medium ml-2 ${
            item.completed ? "text-green-700" : "text-white"
          }`}
        >
          {item.completed ? "Completed!" : "Mark as Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-8 border-b border-gray-100">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Habit Tracker
        </Text>
        <Text className="text-gray-600 mb-6">
          Build better habits, one day at a time
        </Text>

        {/* Stats */}
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">
              {completedCount}
            </Text>
            <Text className="text-gray-500 text-sm">Completed</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-purple-600">
              {habits.length}
            </Text>
            <Text className="text-gray-500 text-sm">Total Habits</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-orange-600">
              {totalStreaks}
            </Text>
            <Text className="text-gray-500 text-sm">Total Streaks</Text>
          </View>
        </View>
      </View>

      {/* Habits List */}
      <View className="flex-1 px-6 pt-6">
        {habits.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg mb-2">No habits yet</Text>
            <Text className="text-gray-400 text-center">
              Start building your perfect day by adding your first habit
            </Text>
          </View>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item._id}
            renderItem={renderHabit}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/create")}
        className="absolute bottom-8 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: "#3b82f6",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
