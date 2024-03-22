import Dexie from 'dexie';

export const db = new Dexie('wtnDatabase');
db.version(1).stores({
  CodeSystem: '++id, key, value', // Primary key and indexed props
});
