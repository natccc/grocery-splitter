import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeModules} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
const {SwiftUIViewControllerBridge} = NativeModules;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [copiedText, setCopiedText] = useState('');

  const openCamera = () => {
    SwiftUIViewControllerBridge.presentSwiftUIViewController();
  };
  const handlePaste = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Paste receipt data here"
            multiline
            numberOfLines={10}
            onChangeText={setCopiedText}
            value={copiedText}
          />
          <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
            <Icon name="paste" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => navigation.navigate('Categorise', {copiedText})}>
          <Text style={styles.buttonText}>Categorise</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  inputContainer: {
    position: 'relative',
  },
  textArea: {
    flex: 1,
    height: 400,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  pasteButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  pasteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
