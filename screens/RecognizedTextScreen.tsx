import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RecognizedTextScreen: React.FC<{route: any}> = ({route}) => {
  const {recognizedText} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{recognizedText}</Text>
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
