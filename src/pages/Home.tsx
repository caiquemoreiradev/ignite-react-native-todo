import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const alreadyExists = tasks.find(task => task.title === newTaskTitle);

    if (alreadyExists) {

      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    const id = new Date().getTime();

    const data = {
      id,
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

    const updateTasks = tasks.map(task => task.id === id ? {
      ...task, done: !task.done
    } : task)

    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    Alert.alert('Exclusão de task', 'Tem certeza que deseja excluir essa task?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK", onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))
        }
      ]
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {

    const updateTasks = tasks.map(task => task.id === taskId ? {
      ...task, title: taskNewTitle
    } : task)

    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202024'
  }
})