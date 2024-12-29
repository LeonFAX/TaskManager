import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const taskPromises = keys.map(key => AsyncStorage.getItem(key));
    const taskData = await Promise.all(taskPromises);
    const loadedTasks = taskData.map(task => JSON.parse(task)).filter(Boolean);
    setTasks(loadedTasks);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = async (title) => {
    await AsyncStorage.removeItem(`task_${title}`);
    setTasks(tasks.filter(task => task.title !== title));
  };

  const updateTask = (title) => {
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
