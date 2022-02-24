import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'

export interface TaskItemProps {
    task: {
        id: number;
        title: string;
        done: boolean;
    }
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);

    const [editTitle, setEditTitle] = useState(task.title);

    const textInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    function handleStartEditing() {

        setIsEditing(true);
    }

    function handleCancelEditing() {

        setIsEditing(false);
    }

    function handleSubmitEditing() {

        editTask(task.id, editTitle);
        setIsEditing(false);
    }

    return (
        <View style={styles.taskContainer}>
            <TouchableOpacity>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        //TODO - use style prop 
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        //TODO - use style prop
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                        onChangeText={text => setEditTitle(text)}
                        onSubmitEditing={handleSubmitEditing}
                    >
                        {task.title}
                    </TextInput>
                </TouchableOpacity>
            </TouchableOpacity>

            <View style={styles.iconsContainer} >
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#fafafa" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Icon name="edit-3" size={24} color="#fafafa" />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    },

    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#fafafa',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },

    iconsContainer: {
        flexDirection: 'row'
    },

    iconsDivider: {
        width: 10
    }
})