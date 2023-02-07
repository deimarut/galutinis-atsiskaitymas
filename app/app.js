const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const getUserFromToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
}

const verifyToken = (req, res, next) => {
    try {
        getUserFromToken(req);
        next();
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
}

app.get('/attendees', verifyToken, (req, res) => {
    const user = getUserFromToken(req);
    connection.execute('SELECT * FROM attendees WHERE userId=?', [user.id], (err, attendees) => {
        res.send(attendees);
    });
});

app.post('/attendees', verifyToken, (req, res) => {
    const { name, surname, email, phone, userId } = req.body;
    const { id } = getUserFromToken(req);

    connection.execute(
        'INSERT INTO attendees (name, surname, email, phone, userId) VALUES (?, ?, ?, ?, ?)', 
        [name, surname, email, phone, id],
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

app.delete('/attendees/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { id: userId } = getUserFromToken(req);

    connection.execute(
        'DELETE FROM attendees WHERE id=? AND userId=?',
        [id, userId],
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

app.patch('/attendees/:id', (req, res) => {
    const { name, surname, email, phone} = req.body;

    connection.execute(
      'UPDATE attendees SET name=?, surname=?, email=?, phone=? WHERE id=?', 
      [name, surname, email, phone, req.params.id],
      () => {
        connection.execute('SELECT * FROM attendees', (err, attendees) => {
          res.send(attendees);
        })
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
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }

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
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].password;
                const isPasswordCorrect = bcrypt.compareSync(password, passwordHash);
                if (isPasswordCorrect) {
                    const { id, name } = result[0];
                    const token = jwt.sign({ id, name }, process.env.JWT_SECRET_KEY);
                    res.send({ token, id, name });
                } else {
                    res.sendStatus(401);
                }
            }
        }
    );
});

app.get('/token/verify', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(user);
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));