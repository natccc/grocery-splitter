import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  loadItemsByDate,
  CategorizedReceiptItem,
  connectToDatabase,
  deleteItemsByDate,
} from '../services/db-service';
import {useNavigation} from '@react-navigation/native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Swipeable} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

export default function DateItems() {
  const [data, setData] = useState<{[key: string]: CategorizedReceiptItem[]}>(
    {},
  );

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

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const navigation = useNavigation();
  const handleDelete = async (date: string) => {
    try {
      const db = await connectToDatabase();
      if (db) {
        await deleteItemsByDate(db, date);
        setData(prevData => {
          const newState = {...prevData};
          delete newState[date];
          return newState;
        });
        Alert.alert('Success', 'Items deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting items:', error);
      Alert.alert('Error', 'Failed to delete items.');
    }
  };

  const renderRightActions = (date: string) => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(date)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDateItem = ({item}: {item: string}) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.itemContent}
          onPress={() => navigation.navigate('ItemsByDate', {date: item})}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
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
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    paddingVertical: 10,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
