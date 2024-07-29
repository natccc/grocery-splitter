import React, {useState, useCallback, useEffect} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {
  showContentView,
  showScannerView,
  recognizeText,
} from './utils/NativeModules'; // Adjust the path as necessary
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from './screens/HomeScreen'
import Categorise from './screens/Categorise';
import {connectToDatabase, createTables} from './services/db-service';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DateItems from './screens/DateItems';
import ItemsByDate from './screens/ItemsByDate';

const Tab = createBottomTabNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Categorise" component={Categorise} />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Date Items" component={DateItems} />
      <Stack.Screen name="Items by date" component={ItemsByDate} />
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
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name = "History" component={HistoryStack} />
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
