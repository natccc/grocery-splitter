import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeModules} from 'react-native';

const {SwiftUIViewControllerBridge} = NativeModules;

export default function PasteItems() {
  const navigation = useNavigation();
  const [copiedItems, setCopiedItems] = useState('');

  const openCamera = () => {
    SwiftUIViewControllerBridge.presentSwiftUIViewController()
  };

  return (
    <View style={styles.container}>
      <Button title="Open Camera" onPress={openCamera} />
      <TextInput
        style={styles.textArea}
        placeholder="Enter receipt data"
        multiline
        numberOfLines={10}
        onChangeText={setCopiedItems}
        value={copiedItems}
      />
      <Button
        title="Submit"
        onPress={() => navigation.navigate('Categorise', {copiedItems})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  textArea: {
    flex: 1,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
});
