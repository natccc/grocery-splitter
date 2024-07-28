import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {recognizeText} from '@/utils/NativeModules'; 
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();

  const handleRecognizeText = async () => {
    try {
      const text = await recognizeText();
      navigation.navigate('RecognizedText',{recognizedText: text})
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Recognize Text" onPress={handleRecognizeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {},
});

export default HomeScreen;
