const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const { reset } = require('nodemon');

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Programavimas2022', 
    database: 'events_organizer',
    port: 3306
}

const connection = mysql.createConnection(mysqlConfig);

app.get('/attendees', (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM attendees WHERE userId=?', [userId], (err, attendees) => {
        res.send(attendees);
    });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));