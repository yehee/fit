import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { HomeScreen, UserScreen, WorkScreen, ExerciseScreen, NewEntryScreen } from './screens'
import style, { background, primary } from './style'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background,
    primary,
  },
};

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleStyle: style.bold }}>
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
        <Stack.Navigator screenOptions={{ headerTitleStyle: style.bold }}>
          <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="NewEntry" component={NewEntryScreen} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} />
        </Stack.Navigator>
      </NavigationContainer> : <AppLoading />
  );
}
