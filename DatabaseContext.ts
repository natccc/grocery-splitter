import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {connectToDatabase} from './services/db-service'; // Update the path as necessary
import { SQLiteDatabase } from 'react-native-sqlite-storage';
interface DatabaseContextProps {
  db: SQLiteDatabase | null;
}

interface DatabaseProviderProps {
  children: ReactNode;
}

const DatabaseContext = createContext<DatabaseContextProps | undefined>(
  undefined,
);

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
}) => {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  const loadData = useCallback(async () => {
    try {
      const database = await connectToDatabase();
      setDb(database);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <DatabaseContext.Provider value={{db}}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextProps => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
