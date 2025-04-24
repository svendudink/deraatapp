// database/index.js
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from '../models/schema'; // your Watermelon schema
import {Safe} from '../models/Safe'; // your Safe model
import {SafeImageArray} from '../models/SafeImageArray';
import {Stock} from '../models/Stock';
// import other models if needed

// We'll keep a reference to the DB to avoid creating multiple instances.
let database;

export const trigger = () => {
  if (!database) {
    // Create the SQLite adapter
    const adapter = new SQLiteAdapter({
      dbName: 'safes', // The name of the local DB file
      schema,
    });

    // Create the WatermelonDB Database instance
    database = new Database({
      adapter,
      modelClasses: [Safe, SafeImageArray, Stock], // Add other models if you have them
      actionsEnabled: true,
    });
  }

  // Return the singleton database
  return database;
};
