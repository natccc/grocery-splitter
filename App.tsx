import React, {useState, useCallback, useEffect} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from './screens/HomeScreen';
import Categorise from './screens/Categorise';
import {connectToDatabase, createTables} from './services/db-service';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DateItems from './screens/DateItems';
import ItemsByDate from './screens/ItemsByDate';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Home'}} />
      <Stack.Screen name="Categorise" component={Categorise} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DateItems"
        component={DateItems}
        options={{title: 'History'}}
      />
      <Stack.Screen
        name="ItemsByDate"
        component={ItemsByDate}
        options={({route}) => ({title: route.params.date})}
      />
    </Stack.Navigator>
  );
}

const App: React.FC = () => {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="History" component={HistoryStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: 'white',
  },
});

export default App;
