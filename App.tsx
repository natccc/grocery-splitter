import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {
  showContentView,
  showScannerView,
  recognizeText,
} from './utils/NativeModules'; // Adjust the path as necessary

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button title="Show Content View" onPress={showContentView} />
      <Button title="Show Scanner View" onPress={showScannerView} />
      <Button title="Recognize Text" onPress={recognizeText} />
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
});

export default App;
