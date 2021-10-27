import React, { useState } from 'react'
import { View, SafeAreaView, TextInput, Modal } from 'react-native'
import { useState as useStore } from '@hookstate/core'
import { Text, SolidButton, ClearButton, OutlineButton } from '../components'
import style from '../style'
import store from '../store'

function NewEntryScreen({ navigation }) {
    const { routines } = useStore(store)
    const [routineTitle, setRoutineTitle] = useState('')
    const [routineDuration, setRoutineDuration] = useState(0)
    const [title, setTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [info, setInfo] = useState('')
    const [visible, setVisible] = useState(false)
    const [routine, setRoutine] = useState([])

    const id = (value) => {
        return value.trim().toLowerCase().replace(/[\W]+/g, '-')
    }
    const addRoutine = () => {
        routines.merge({ [id(routineTitle)]: { id: id(routineTitle), title: routineTitle, duration: routineDuration, routine } })
        navigation.navigate('Work')
    }
    const addExercise = () => {
        setRoutineDuration(routineDuration + Number(duration))
        setRoutine([...routine, { title, duration, info }])
        setTitle('')
        setDuration('')
        setInfo('')
        setVisible(false)
    }
    return (
        <SafeAreaView style={{ margin: 24 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, ...style.semibold }}>Add a new workout routine</Text>
            <TextInput
                style={style.input}
                onChangeText={setRoutineTitle}
                value={routineTitle}
                placeholder='Add title'
            />
            {routineTitle.length > 0 && <Text style={{ fontSize: 10, color: '#888' }}>ID: {id(routineTitle)}</Text>}
            {routine.map(({ title, duration }, index) => (
                <View key={index} style={style.item}>
                    <Text>{title}</Text>
                    <Text>{`${duration} minutes`}</Text>
                </View>

            ))}
            <ClearButton title="+ Add a new exercise" onPress={() => setVisible(true)} />
            <SolidButton title="Add" onPress={addRoutine} />
            <Modal
                animationType="slide"
                presentationStyle="formSheet"
                visible={visible}
            >
                <View style={{ margin: 24 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, ...style.bold }}>Add a new exercise</Text>
                    <TextInput
                        style={style.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder='Add title'
                        placeholderTextColor="#bbb"
                    />
                    <TextInput
                        style={style.input}
                        keyboardType="numeric"
                        placeholder="Add duration in minutes"
                        onChangeText={setDuration}
                        placeholderTextColor="#bbb"
                        value={duration}
                    />
                    <TextInput
                        style={style.input}
                        placeholder="Enter additional information"
                        onChangeText={setInfo}
                        value={info}
                        multiline
                    />
                    <SolidButton title="Add" onPress={addExercise} />
                    <OutlineButton title="Close" onPress={() => setVisible(false)} />
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default NewEntryScreen
