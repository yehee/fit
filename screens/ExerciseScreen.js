import React, { useState } from 'react'
import { Animated, View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Text, ClearButton } from '../components'
import style, { primary, secondary, warning } from '../style'

function ExerciseScreen({ route, navigation }) {
    const { title, duration, routine } = route.params
    const [index, setIndex] = useState(0)
    const angleLeft = { name: "angle-left", size: 30, color: primary, type: "font-awesome" }
    const angleRight = { name: "angle-right", size: 30, color: primary, type: "font-awesome" }
    function Exercise({ title, duration = 300, reps = 12, sets = 3, info }) {
        return (
            <View style={{ display: 'flex', flexDirection: 'row', margin: 24 }}>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 30, width: 180, ...style.semibold }}>{title}</Text>
                    <CountdownCircleTimer
                        isPlaying
                        duration={duration * 60}
                        colors={[
                            [primary, 0.4],
                            [secondary, 0.4],
                            [warning, 0.2],
                        ]}
                    >
                        {({ remainingTime, animatedColor }) => {
                            const minutes = Math.floor(remainingTime / 60)
                            const seconds = remainingTime % 60
                            return (
                                remainingTime > 0 ?
                                    <Animated.Text style={{ color: animatedColor, ...style.text }}>
                                        {minutes > 0 && `${minutes} min`} {seconds > 0 && `${seconds} sec`}
                                    </Animated.Text> : <Text>Done!</Text>
                            )
                        }}
                    </CountdownCircleTimer>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', display: "flex", flexDirection: "row" }}>
                <ClearButton
                    icon={angleLeft}
                    onPress={() => setIndex(index - 1)} disabled={index === 0}
                />
                <Exercise {...routine[index]} />
                <ClearButton
                    icon={angleRight}
                    onPress={() => setIndex(index + 1)}
                    disabled={index === routine.length - 1}
                />
            </View>
            {index == routine.length - 1 && (
                <ClearButton
                    title="All done!"
                    onPress={() => navigation.navigate('Home', { title, duration })}
                />
            )}
        </View>
    )
}

export default ExerciseScreen
