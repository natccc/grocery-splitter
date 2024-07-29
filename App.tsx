import React, {useState, useCallback,useEffect} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {
  showContentView,
  showScannerView,
  recognizeText,
} from './utils/NativeModules'; // Adjust the path as necessary
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
import HomeScreen from './archive/HomeScreen';
import PasteItems from './screens/PasteItems';
import Categorise from './screens/Categorise';
import { connectToDatabase,createTables } from './services/db-service';

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
      <Stack.Navigator>
        {/* <Stack.Screen name = "Home" component={HomeScreen} /> */}
        <Stack.Screen name = "PasteItems" component={PasteItems} />
        <Stack.Screen name = "Categorise" component={Categorise} />

        
      </Stack.Navigator>
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
