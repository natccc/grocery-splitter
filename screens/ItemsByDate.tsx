import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {
  loadItemsByDate,
  connectToDatabase,
  loadSummaries,
} from '../services/db-service';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
const categoryColor= {
 'Shared': '#F44336',
  'Me': '#4CAF50',
   'Friend':'#FFC107'
};
export default function ItemsByDate({route}) {
  const [items, setItems] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const {date} = route.params;

  useEffect(() => {
    const loadData = async () => {
      try {
        const db = await connectToDatabase();
        await loadItemsByDate(db, loadedData => setItems(loadedData));
        await loadSummaries(db, date, loadedSummaries =>
          setSummaries(loadedSummaries),
        );
      } catch (error) {
        console.error(
          'Error connecting to the database or loading items:',
          error,
        );
      }
    };
    loadData();
  }, [date]);

  const itemsByDate = items[date] || [];
  const hasSummaries = summaries.length > 0 && summaries[0]?.category_totals;
  const parsedCategoryTotals = hasSummaries
    ? JSON.parse(summaries[0].category_totals)
    : {};

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>£{item.price.toFixed(2)}</Text>
        <Text style={[styles.itemCategory, {color: categoryColor[item.category]}]}>{item.category}</Text>
      </View>
    </View>
  );


  const renderFooter = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.sectionHeader}>Summary:</Text>
      {hasSummaries ? (
        Object.keys(parsedCategoryTotals).map(category => (
            <Text key={category} style={[styles.summaryText, { color: categoryColor[category] }]}>
                {category}: £{parsedCategoryTotals[category]}
          </Text>
        ))
      ) : (
        <Text style={styles.summaryText}>No category totals available</Text>
      )}
      {hasSummaries && (
        <Text style={styles.summaryText}>
          Total: £{summaries[0].total.toFixed(2)}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsByDate}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderFooter}
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 5,

 
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
  },
  itemCategory: {
    fontSize: 14,
    color: '#888',
  },
  summaryContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 20,
    marginHorizontal: 10,
    },
  
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
