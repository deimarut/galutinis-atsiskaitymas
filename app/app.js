const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}

const connection = mysql.createConnection(mysqlConfig);

app.get('/attendees', (req, res) => {
    const { userId } = req.query;
    connection.execute('SELECT * FROM attendees WHERE userId=?', [userId], (err, attendees) => {
        res.send(attendees);
    });
});

app.post('/attendees', (req, res) => {
    const {name, surname, email, phone, userId} = req.body;

    connection.execute(
        'INSERT INTO attendees (name, surname, email, phone, userId) VALUES (?, ?, ?, ?, ?)', 
        [name, surname, email, phone, userId],
        () => {
            connection.execute(
                'SELECT * FROM attendees WHERE userId=?', 
                [userId], 
                (err, attendees) => {
                    res.send(attendees);
                }
            )
        }
    )
});

app.post('/register', (req, res) => {
    const { email, name, surname, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    connection.execute(
        'INSERT INTO users (email, name, surname, password) VALUES (?, ?, ?, ?)', 
        [email, name, surname, hashedPassword], 
        (err, result) => {
            res.send(result);
        }
    )
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    connection.execute(
        'SELECT * FROM users WHERE email=?', 
        [email], 
        (err, result) => {
            if (result.length === 0) {
                res.send('Incorrect username or password');
            } else {
                const passwordHash = result[0].password;
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    res.send(result[0]);
                } else {
                    res.send('Incorrect username or password');
                }
            }
        }
    );
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));