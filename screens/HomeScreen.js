import React, { useState, useEffect, useRef } from 'react';
import { Animated, Text, View, Dimensions, Modal, LayoutAnimation } from 'react-native';
import { ProgressChart, ContributionGraph } from 'react-native-chart-kit';
import { Button } from 'react-native-elements'
import LottieView from 'lottie-react-native'

const screenWidth = Dimensions.get("window").width - 48;

const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 0, 127, ${opacity})`,
    useShadowColorFromDataset: false // optional
};

// each value represents a goal ring in Progress chart
const progress = {
    labels: ["minutes", "calories", "steps"], // optional
    data: [0.4, 0.6, 0.8],
    goals: [60, 1000, 300]
};

const commits = [
    { date: "2021-10-02", count: 1 },
    { date: "2021-10-03", count: 2 },
    { date: "2021-10-04", count: 3 },
    { date: "2021-10-05", count: 4 },
    { date: "2021-10-06", count: 5 },
    { date: "2021-10-30", count: 2 },
    { date: "2021-10-31", count: 3 },
];

function HomeScreen({ route }) {
    const { title, duration } = route.params ?? {}
    const [progressTime, setProgressTime] = useState(0)
    const [visible, setVisible] = useState(true)

    // https://gist.github.com/majirosstefan/087cfc64cad5f2019caa1d9d70700dd8
    // Define a initial value for chart
    const animationValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        // Define animation for chart
        Animated.timing(animationValue, {
            toValue: 1, // Value to graph
            duration: 1000, // Duration for animation
            useNativeDriver: true,
        }).start()

        // Listen the animation variable and update chart variable
        animationValue.addListener(({ value }) => {
            console.log('🚀 ~ animationValue.addListener ~ value', value)
            setProgressTime(value);
        });

    }, [])
    useEffect(() => setVisible(Boolean(title)), [title])

    return (
        <View style={{ padding: 24 }}>
            <Text style={{ fontFamily: "Quicksand_700Bold" }}>{new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</Text>
            <Text style={{ fontSize: 24, marginTop: 5, fontFamily: "Quicksand_700Bold" }}>Hello Alice 👋</Text>
            <Text style={{ fontSize: 16, marginTop: 10, fontFamily: "Quicksand_600SemiBold" }}>Today's report</Text>
            <ProgressChart
                data={{
                    labels: ["minutes", "calories", "steps"], // optional
                    data: [0.4 * progressTime, 0.6 * progressTime, 0.8 * progressTime],
                    goals: [60, 1000, 300]
                }}
                width={screenWidth}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={chartConfig}
                hideLegend
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30 }}>
                {progress.data.map((point, index) => (
                    <View key={index}>
                        <Text style={{ textAlign: 'center', fontSize: 24 }}>{point * progress.goals[index]}</Text>
                        <Text style={{ textAlign: 'center' }}>{progress.labels[index]}</Text>
                    </View>
                ))}
            </View>
            <Text style={{ fontSize: 16, marginTop: 20, fontFamily: "Quicksand_600SemiBold" }}>{commits.length} days in the last 90 days</Text>
            <ContributionGraph
                values={commits}
                endDate={Date.now()}
                numDays={90}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
            <Modal
                animationType="slide"
                presentationStyle="formSheet"
                visible={visible}
            >
                <View style={{ margin: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, marginTop: 50, marginBottom: 10, fontFamily: "Quicksand_700Bold" }}>You did it!</Text>
                    <LottieView source={require('../assets/seated-dumbbell-bicep-curl.json')} style={{ width: 250 }} autoPlay loop />
                    <Text>You completed {duration} minute of {title} workout.</Text>
                    <Button title="Close" type="outline" onPress={() => setVisible(false)} titleStyle={{ fontFamily: "Quicksand_500Medium", color: '#FF007F' }} buttonStyle={{ borderColor: '#FF007F', width: 320 }} style={{ marginTop: 18 }} />
                </View>
            </Modal>
        </View>
    );
}

export default HomeScreen;
