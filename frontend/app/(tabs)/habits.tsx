import { View, Button, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import API from "../../utils/api";

interface Habit {
  _id: string;
  title: string;
}

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
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
    <View>
      <Button title="Add Habit" onPress={() => router.push("/create")} />
      <FlatList
        data={habits}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button title="Mark Done" onPress={() => markComplete(item._id)} />
          </View>
        )}
      />
    </View>
  );
}
