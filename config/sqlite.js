const sqlite3 = require('sqlite3');

const dbName = "main.db"

// Connection à la bdd
let db = new sqlite3.Database(dbName, err => {
        err ? console.error(err) : console.log('db started: ' + dbName) 
});

/**
 * SCRIPT de creation remplissage table
 * db.run('CREATE TABLE Users(UserId INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, mail TEXT NOT NULL UNIQUE, password TEXT NOT NULL, token TEXT);')
 *  db.run('CREATE TABLE Sessions(SessionId INTEGER PRIMARY KEY AUTOINCREMENT, start INTEGER, end INTEGER NOT NULL, cashout INTEGER, date DATE NOT NULL, comment TEXT, UserId INTEGER NOT NULL, FOREIGN KEY (UserId) REFERENCES User(UserId));')
 * 
 * db.run('INSERT INTO Users (name, mail, password) VALUES("Aaa", "y.beneito@gmail.fr", "123456")')
 * db.run('INSERT INTO Sessions (start, end, date, comment, UserId) VALUES(100, 300, 2021-09-25, "hey hey", 1)')
 */
 


// Fermeture de la connection 
// db.close(err => {
//     err ? console.error(err) : console.log('db closed')
// })

module.exports = db