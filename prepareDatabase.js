import mysql2 from 'mysql2';

const PORT = 3306;
const DATABASE = 'shopeasy';

// Utwórz połączenie z MySQL w celu obsługi tworzenia bazy danych
const connection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: PORT
});

// Tworzenie bazy danych, jeśli nie istnieje
connection.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE} CHARACTER SET utf8 COLLATE utf8_general_ci`, (err, result) => {
    if (err) {
        console.log('Baza danych już istnieje: ' + DATABASE);
    } else {
        console.log('Utworzono nową bazę danych: ' + DATABASE);
    }
});

// Zakończ połączenie
connection.end();
