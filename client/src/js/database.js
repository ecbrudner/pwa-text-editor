import { openDB } from 'idb';

const initdb = async () => {
  try {
    console.log('initialize the database');
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains('jate')) {
          console.log('jate database already exists');
          return;
        } else {
        const store= db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created', store);
        }
      },
    });
    console.log('Database initialized', db);
    return db;

  } catch (error) {
    console.error('initdb not implemented', error);
    throw error;
  }
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log('Add content to the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({value: content});
    await tx.done;
    console.log('Data saved to the database', request);

  } catch (error) {
  console.error('putDb not implemented', error);
  throw error;
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET content from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('Data retrieved from the database', result);
    return result;

  } catch (error) {
    console.error('getDb not implemented', error);
    throw error;
  }
};

initdb();