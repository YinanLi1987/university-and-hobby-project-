const express = require("express");
const app = express();
const serveStatic = require('serve-static')
const path = require('path');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const BasicStrategy= require('passport-http').BasicStrategy;
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
// test
app.get("/fruits", (req, res, next) => {
    res.json(["Banana","Apple","Kiwi"]);
    });
// get home page
app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "UI/home.html"));
    });
app.use('/', serveStatic(path.join(__dirname, 'UI')));
// get data from table usrInfo
app.get('/db', async (req, res) => {
    const { Pool } = require('pg');
        const pool = (() => {
            return new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });
        })();
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usrInfo;');
        const results = { 'results': (result) ? result.rows : null};
        res.json( results );
        client.release();
    } catch (err) {
          console.error(err);
          res.json({ error: err });
          }
      });

// submit sign data into database table usrInfo
app.post('/submit', async (req, res) => {
        const { Pool } = require('pg');
        const pool = (() => {
            return new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });
        })();
      try {
          const {fname, lname, email, phoneNumber,userType,password} = req.body;
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          const client = await pool.connect();
          client.query('INSERT INTO usrInfo VALUES (DEFAULT,$1, $2, $3,$4,$5,$6)',[fname, lname,email, phoneNumber,userType,hashedPassword]);
      //const results = { 'results': (result) ? result.rows : null};
      //res.json( results );
          res.redirect('/')
          client.release();
      } catch (err) {
            console.error(err);
            res.json({ error: err });
        }
      });
// validate login status
app.post('/login', async (req, res) => {
    const { Pool } = require('pg');
    const pool = (() => {
        return new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }); 
    })();
const {Email, Password} = req.body;
const client = await pool.connect();
const user = await client.query('SELECT email, password FROM usrInfo WHERE email=$1;',[Email])
const loginUser = (user) ? user.rows : null;

//------------this following 3 line3 of code does not work as expected-------------------
if (loginUser==null) {
    return res.status(400).send('Incorrect username or password')
}
// compare the password
try {
    if(await bcrypt.compare(req.body.Password, loginUser[0].password)) {
        client.query('INSERT INTO loginInfo VALUES ($1);',[Email])
        res.send('Logged in successfully');
    } else {
        res.send('Incorrect username or password')
      }
    client.release();
} catch (err) {
    console.error(err);
    res.json({ error: err });
    }
  });





    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});