const express = require('express');
const mysql = require('mysql2');

const app = express();

const mysqlConfig = {
    host: '127.0.0.1', 
    user: 'root', 
    password: 'Programavimas2022', 
    database: 'events_organizer',
    port: 3306
}

const connection = mysql.createConnection(mysqlConfig);

const PORT = 8000;
app.listen(PORT, () => console.log(`Express server is running on PORT:${PORT}`));