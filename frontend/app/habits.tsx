import { View, Button, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const router = useRouter();

  const fetchHabits = async () => {
    const res = await API.get("/habits");
    setHabits(res.data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const markComplete = async (id: string) => {
    await API.post(`/habits/${id}/track`);
    fetchHabits();
  };

  return (
    <View className="gap-4">
      <Button title="Add Habit" onPress={() => router.push("/create")} />
      <FlatList
        data={habits}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="border p-4 rounded-md">
            <Text
              className={`text-lg font-bold mb-2 ${item.completed ? "text-green-600 line-through" : "text-gray-800"}`}
            >
              {item.title}
            </Text>
            <Button title="Mark Done" onPress={() => markComplete(item._id)} />
          </View>
        )}
      />
    </View>
  );
}
