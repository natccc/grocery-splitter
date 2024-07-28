import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {
  showContentView,
  showScannerView,
  recognizeText,
} from './utils/NativeModules'; // Adjust the path as necessary
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()
import HomeScreen from './screens/HomeScreen';
import RecognizedTextScreen from './screens/RecognizedTextScreen';
const App: React.FC = () => {
  // const [recognizedText, setRecognizedText] = useState('');
  // const handlePress = async () => {
  //   const text = await recognizeText();
  //   setRecognizedText(text);
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component={HomeScreen} />
        <Stack.Screen name = "RecognizedText" component={RecognizedTextScreen} />
      {/* <View style={styles.container}>
        <Button title="Show scanner View" onPress={handlePress} />
        {recognizedText && <Text style={styles.text}>{recognizedText}</Text>}
        </View> */}
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
