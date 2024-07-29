import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const RecognizedTextScreen: React.FC<{route: any}> = ({route}) => {
  const { recognizedText } = route.params;
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{recognizedText}</Text>
      <Button title='Categorise' onPress={()=>navigation.navigate('Categorise',{recognizedText: recognizedText})
}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default RecognizedTextScreen;
