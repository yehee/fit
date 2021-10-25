import React, { useState } from 'react';
import { Animated, View, SafeAreaView, StyleSheet, TextInput, Modal } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { HomeScreen, UserScreen, WorkScreen } from './screens';
import Text from './components/Text'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orangered',
    background: 'white'
  },
};

function NewEntryScreen() {
  const [routineTitle, setRoutineTitle] = useState('')
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [info, setInfo] = useState('')
  const [visible, setVisible] = useState(false)
  const [exercise, setExercise] = useState([])

  const addExercise = () => {
    setExercise([...exercise, { title, duration, info }])
    setTitle('')
    setDuration('')
    setInfo('')
    setVisible(false)
  }
  return (
    <SafeAreaView style={{
      margin: 24
    }}>
      <Text style={{ fontSize: 18, marginBottom: 10, fontFamily: "Quicksand_700Bold" }}>Add a new workout routine</Text>
      <TextInput
        style={styles.input}
        onChangeText={setRoutineTitle}
        value={routineTitle}
        placeholder='Add title'
      />
      {exercise.map(({ title, duration }) => (
        <View style={{
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
        }}>
          <Text>{title}</Text>
          <Text>
            {`${duration} minutes`}
          </Text>
        </View>

      ))}
      <Button
        title="+ Add a new exercise"
        onPress={() => setVisible(true)}
        titleStyle={{ marginVertical: 5, fontSize: 16, color: "orangered", fontFamily: "Quicksand_500Medium" }}
        type="clear" />
      <Button title="Add" titleStyle={{ fontFamily: "Quicksand_500Medium" }} buttonStyle={{ backgroundColor: "orangered" }} style={{ marginTop: 18 }} />
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={visible}
      >
        <View style={{ margin: 24 }}>
          <Text style={{ fontSize: 18, marginBottom: 10, fontFamily: "Quicksand_700Bold" }}>Add a new exercise</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder='Add title'
            placeholderTextColor="#bbb"
          />
          <TextInput style={styles.input} keyboardType="numeric" placeholder="Add duration" onChangeText={setDuration} placeholderTextColor="#bbb"
            value={duration} />
          <TextInput style={styles.input} placeholder="Enter additional information" multiline onChangeText={setInfo}
            value={info} />
          <Button title="Add" titleStyle={{ fontFamily: "Quicksand_500Medium" }} buttonStyle={{ backgroundColor: "orangered" }} style={{ marginTop: 18 }} onPress={addExercise} />
          <Button title="Close" type="outline" onPress={() => setVisible(false)} titleStyle={{ fontFamily: "Quicksand_500Medium", color: 'orangered' }} buttonStyle={{ borderColor: 'orangered' }} style={{ marginTop: 18 }} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

function ExerciseScreen({ route, navigation }) {
  const { title, duration, routine } = route.params
  const [index, setIndex] = useState(0)
  function Exercise({ title, duration = 300, reps = 12, sets = 3, info }) {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', margin: 24 }}>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 30, fontFamily: "Quicksand_600SemiBold", width: 180 }}>{title}</Text>
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            colors={[
              ['#FF4500', 0.4],
              ['#FF007F', 0.4],
              ['#FF003B', 0.2],
            ]}
          >
            {({ remainingTime, animatedColor }) => {
              const minutes = Math.floor(remainingTime / 60)
              const seconds = remainingTime % 60
              return (
                remainingTime > 0 ?
                  <Animated.Text style={{ color: animatedColor }}>
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
        <Button
          type="clear"
          icon={{
            name: "angle-left",
            size: 30,
            color: "orangered",
            type: "font-awesome"
          }}
          onPress={() => setIndex(index - 1)} disabled={index === 0} />
        <Exercise {...routine[index]} />
        <Button
          type="clear"
          icon={{
            name: "angle-right",
            size: 30,
            color: "orangered",
            type: "font-awesome"
          }}
          onPress={() => setIndex(index + 1)}
          disabled={index === routine.length - 1} />
      </View>
      {index == routine.length - 1 && (
        <Button
          title="All done!"
          type="clear"
          titleStyle={{ color: "orangered", fontFamily: "Quicksand_600SemiBold" }}
          onPress={() => navigation.navigate('Home', { title, duration })} />
      )}
    </View>
  )
}

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleStyle: { fontFamily: "Quicksand_600SemiBold" } }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Ionicons name="home" size={24} /> }} />
      <Tab.Screen name="Work" component={WorkScreen} options={{ tabBarIcon: () => <Ionicons name="barbell" size={24} /> }} />
      <Tab.Screen name="User" component={UserScreen} options={{ tabBarIcon: () => <Ionicons name="person" size={24} /> }} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  return (
    fontsLoaded ?
      <NavigationContainer theme={Theme}>
        <Stack.Navigator screenOptions={{ headerTitleStyle: { fontFamily: "Quicksand_600SemiBold" } }}>
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="NewEntry" component={NewEntryScreen} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} />
        </Stack.Navigator>
      </NavigationContainer> : <AppLoading />
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  input: {
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    fontFamily: "Quicksand_500Medium",
    padding: 10,
  },
});
