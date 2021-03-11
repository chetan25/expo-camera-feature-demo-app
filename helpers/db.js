import * as SQLite from 'expo-sqlite'

// it will open or create new db
const db = SQLite.openDatabase('places.db');

export const init = () => {
    //create table if does not exist
    const promise = new Promise((res, rej) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
              [],
              (queryExecuted, result) => {
                res();
              },
              (queryExecuted, err) => {
                rej(err);
              }
            );
        });
    });

    return promise;
}

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((res, rej) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO places (title, imageUri, address, lat, lng) VALUES(?, ?, ?, ?, ?)',
              [title, imageUri, address, lat, lng],
              (queryExecuted, result) => {
                res(result);
              },
              (queryExecuted, err) => {
                rej(err);
              }
            );
        });
    });

    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((res, rej) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM places',
              [],
              (queryExecuted, result) => {
                res(result);
              },
              (queryExecuted, err) => {
                rej(err);
              }
            );
        });
    });

    return promise;
}