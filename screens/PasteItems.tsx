import {
  View,
  Text,
  StyleSheet,
  TextInput,
    TouchableOpacity,
ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function PasteItems() {
  const navigation = useNavigation();
  const [copiedItems, setCopiedItems] = useState('');
    
 
  const handlePress = () => {
    navigation.push('Categorise', {copiedItems});
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Paste your receipt here</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter receipt data"
        multiline
        numberOfLines={10}
        onChangeText={copiedItems => setCopiedItems(copiedItems)}
        value={copiedItems}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  textArea: {
    flex: 0.8,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
