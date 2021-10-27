import React from 'react';
import { View } from 'react-native'
import { useState } from '@hookstate/core'
import { Text, ClearButton } from '../components'
import style from '../style'
import store from '../store'

function WorkScreen({ navigation }) {
    const { routines } = useState(store)
    return (
        <View style={{ margin: 24 }}>
            <Text style={{ fontSize: 18, marginBottom: 10, fontFamily: "Quicksand_600SemiBold" }}>What are we doing today?</Text>
            {Object.values(routines.get()).map(({ title, duration, routine }, index) => (
                <View key={index} style={style.item}>
                    <View>
                        <Text style={{ fontSize: 16, fontFamily: "Quicksand_600SemiBold" }}>{title}</Text>
                        <Text style={{ fontSize: 12 }}>{duration} minutes</Text>
                    </View>
                    <ClearButton title="Go" onPress={() => navigation.navigate('Exercise', { title, duration, routine })} />
                </View>
            ))}
            <ClearButton title="+ Add a new workout routine" onPress={() => navigation.navigate('NewEntry')} />
        </View>
    );
}

export default WorkScreen;
