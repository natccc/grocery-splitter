import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {format} from 'date-fns';

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
) => {
  const timestamp = format(new Date(), 'dd/MM/yyyy HH:mm');
  await db.executeSql(
    'INSERT INTO items (name, price, category, timestamp) VALUES (?, ?, ?, ?)',
    [name, price, category, timestamp],
  );
};

export const saveSummary = async (
  db: SQLiteDatabase,
  total: number,
  categoryTotals: {[key: string]: number},
) => {
  const timestamp = format(new Date(), 'dd/MM/yyyy HH:mm');
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
    const allRows: CategorizedReceiptItem[] = await db.executeSql(
      'SELECT * FROM items ORDER BY timestamp DESC',
    );
    const groupedData = allRows.reduce<{
      [key: string]: CategorizedReceiptItem[];
    }>((acc, item) => {
      const timestamp = item.timestamp!;
      if (!acc[timestamp]) {
        acc[timestamp] = [];
      }
      acc[timestamp].push(item);
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
    const summaries: ReceiptSummary[] = await db.executeSql(
      'SELECT * FROM summaries WHERE timestamp = ?',
      [date],
    );
    callback(summaries);
  } catch (error) {
    console.error('Error fetching summaries:', error);
  }
};
// Function to delete all data from the table
export const deleteAllData = async (db: SQLiteDatabase): Promise<void> => {
  await db.executeSql('DROP table items');
  await db.executeSql('DROP table summaries');
};
