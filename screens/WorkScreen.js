import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useState } from '@hookstate/core'
import store from '../store'

function WorkScreen({ navigation }) {
    const { routines } = useState(store)
    return (
        <View style={{ margin: 24 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontFamily: "Quicksand_600SemiBold" }}>What are we doing today?</Text>
            {Object.values(routines.get()).map(({ title, duration, routine }, index) => (
                <View key={index} style={styles.box}>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: "Quicksand_600SemiBold" }}>{title}</Text>
                        <Text style={{ fontSize: 12 }}>{duration} minutes</Text>
                    </View>
                    <Button title="Go" titleStyle={{ color: "#FF007F", fontFamily: "Quicksand_600SemiBold" }} type="clear" onPress={() => navigation.navigate('Exercise', { title, duration, routine })} />
                </View>
            ))}
            <Button
                title="+ Add a new workout routine"
                onPress={() => navigation.navigate('NewEntry')}
                titleStyle={{ marginVertical: 5, fontSize: 16, color: "#FF007F", fontFamily: "Quicksand_500Medium" }}
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
