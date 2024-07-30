import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {
  loadItemsByDate,
  CategorizedReceiptItem,
  connectToDatabase,
} from '../services/db-service';
import {useNavigation} from '@react-navigation/native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
export default function DateItems() {
  const [data, setData] = useState<{[key: string]: CategorizedReceiptItem[]}>(
    {},
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const db = await connectToDatabase();
        if (db) {
          loadItemsByDate(db, loadedData => {
            setData(loadedData);
          });
        }
      } catch (error) {
        console.error(
          'Error connecting to the database or loading items:',
          error,
        );
      }
    };
    loadData()
  }, []);

  const navigation = useNavigation();

  const renderDateItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Items by date', {date: item})}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(data)}
        renderItem={renderDateItem}
        keyExtractor={item => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
  },
});
