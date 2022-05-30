let express = require("express");
let app = express();

const serveStatic = require('serve-static')
const path = require('path');

const bodyParser= require('body-parser');
const bcrypt = require('bcrypt');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.get("/fruits", (req, res, next) => {
    res.json(["Banana","Apple","Kiwi"]);
    });
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "UI/home.html"));
    });
    app.use('/', serveStatic(path.join(__dirname, 'UI')));

app.get('SERVER_SIDE/database.sql', async (req, res) => {

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
        const result = await client.query('SELECT * FROM usersInfo;');
        const results = { 'results': (result) ? result.rows : null};
        res.json( results );
        client.release();
    } catch (err) {
          console.error(err);
          res.json({ error: err });
          }
      });


      app.post('/submit', async (req, res) => {
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
          client.query('INSERT INTO usersInfo VALUES (DEFAULT,$1, $2, $3,$4,$5,$6)',[fname, lname,email, phoneNumber,userType,hashedPassword]);
      //const results = { 'results': (result) ? result.rows : null};
      //res.json( results );
          res.redirect('/')
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