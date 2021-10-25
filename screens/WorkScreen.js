import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Text from '../components/Text'

const upperBodyRoutine = [
    { title: "Warm up", duration: 90 },
    { title: "Muscle release" },
    { title: "Chest press", info: "12.5 lbs" },
    { title: "Dumbbell rows", info: "15 lbs" },
    { title: "Shoulder press", info: "10 lbs" },
    { title: "Lat pull down", info: "30 lbs, using machine" },
    { title: "Rope pull down", info: "9 lbs" },
    { title: "Stretch" },
]

const lowerBodyRoutine = [
    { title: "Warm up", duration: 5 },
    { title: "Muscle release" },
    { title: "Bands loop activation", reps: 10, info: "Orange loop" },
    { title: "Squats", info: "55 lbs" },
    { title: "Romanian deadlifts", info: "50 lbs" },
    { title: "Stability ball hamstring curls" },
    { title: "Walking longes", reps: 20, info: "15 lbs" },
    { title: "Stretch" },
]

const routines = [
    { title: "Upper body", duration: 2190, routine: upperBodyRoutine },
    { title: "Lower body", duration: 2105, routine: lowerBodyRoutine },
]

function WorkScreen({ navigation }) {
    return (
        <View style={{ margin: 24 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontFamily: "Quicksand_600SemiBold" }}>What are we doing today?</Text>
            {routines.map(({ title, duration, routine }, index) => (
                <View key={index} style={styles.box}>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: "Quicksand_600SemiBold" }}>{title}</Text>
                        <Text style={{ fontSize: 12 }}>{Math.floor(duration / 60)} minutes</Text>
                    </View>
                    <Button title="Go" titleStyle={{ color: "orangered", fontFamily: "Quicksand_600SemiBold" }} type="clear" onPress={() => navigation.navigate('Exercise', { title, duration, routine })} />
                </View>
            ))}
            <Button
                title="+ Add a new workout routine"
                onPress={() => navigation.navigate('NewEntry')}
                titleStyle={{ marginVertical: 5, fontSize: 16, color: "orangered", fontFamily: "Quicksand_500Medium" }}
                type="clear" />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.15, shadowRadius: 2,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 5,
        marginVertical: 8
    }
})

export default WorkScreen;
