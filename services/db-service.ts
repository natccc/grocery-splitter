import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {format} from 'date-fns';
import { convertToISOString } from '../utils/convertToISOString';

enablePromise(true);



export interface CategorizedReceiptItem {
  id?: number;
  name: string;
  price: number;
  category: string;
  timestamp?: string;
}
export interface ReceiptSummary {
  id?: number;
  timestamp: string;
  total: number;
  categoryTotals: string;
}

export const connectToDatabase = async () => {
  return openDatabase({name: 'myDatabase.db', location: 'default'});
};

export const createTables = async (db: SQLiteDatabase) => {
  try {
    await db.executeSql(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        timestamp TEXT NOT NULL
      )`);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        total REAL NOT NULL,
        category_totals TEXT NOT NULL
      )`);
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

export const saveItem = async (
  db: SQLiteDatabase,
  name: string,
  price: number,
  category: string,
  timestamp: string,
) => {

  await db.executeSql(
    'INSERT INTO items (name, price, category, timestamp) VALUES (?, ?, ?, ?)',
    [name, price, category, timestamp],
  );
};

export const saveSummary = async (
  db: SQLiteDatabase,
  total: number,
  categoryTotals: {[key: string]: number},
  timestamp: string,
) => {
  const categoryTotalsJson = JSON.stringify(categoryTotals);
  await db.executeSql(
    'INSERT INTO summaries (timestamp, total, category_totals) VALUES (?, ?, ?)',
    [timestamp, total, categoryTotalsJson],
  );
};

export const loadItemsByDate = async (
  db: SQLiteDatabase,
  callback: (categorizedItems: {
    [key: string]: CategorizedReceiptItem[];
  }) => void,
): Promise<void> => {
  try {
    const results = await db.executeSql(
      'SELECT * FROM items ORDER BY timestamp DESC',
    );
      const allRows: CategorizedReceiptItem[] = [];
    results.forEach(resultSet => {
      for (let i = 0; i < resultSet.rows.length; i++) {
        allRows.push(resultSet.rows.item(i))
      }
    })

    const groupedData = allRows.reduce<{
      [key: string]: CategorizedReceiptItem[];
    }>((acc, item) => {
      const formattedDate = format(
        new Date(item.timestamp),
        'dd/MM/yyyy HH:mm',
      ); 

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(item);
      return acc;
    }, {});

    callback(groupedData);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

export const loadSummaries = async (
  db: SQLiteDatabase,
  date: string,
  callback: (summaries: ReceiptSummary[]) => void,
): Promise<void> => {
  try {
    const summaries: ReceiptSummary[] = []
    const results= await db.executeSql(
      'SELECT * FROM summaries WHERE timestamp = ?',
      [date],
    );
    results.forEach(resultSet => {
      for (let i = 0; i < resultSet.rows.length; i++) {
        summaries.push(resultSet.rows.item(i))
      }
    })
    callback(summaries);
  } catch (error) {
    console.error('Error fetching summaries:', error);
  }
};
export const deleteAllData = async (db: SQLiteDatabase): Promise<void> => {
  try {
    await db.executeSql('DROP table items');
    await db.executeSql('DROP table summaries')
  }
  catch (error) {
    console.error('Error deleting all data:', error);
  }
};

export const deleteItemsByDate = async (
  db: SQLiteDatabase,
  date: string,
): Promise<void> => {

  await db.executeSql('DELETE FROM items WHERE timestamp = ?', [date]);
};
