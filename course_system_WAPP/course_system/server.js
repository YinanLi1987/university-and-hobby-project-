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
app.set('view engine', 'ejs')
// test
app.get("/fruits", (req, res, next) => {
    res.json(["Banana","Apple","Kiwi"]);
    });
// get each page
app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "UI/home.html"));
    });
app.use('/', serveStatic(path.join(__dirname, 'UI')));

app.get("/teacher_home", function(req, res) {
    
    res.sendFile(path.join(__dirname, "UI/teacher_home.html"));
});
app.use('/teacher_home', serveStatic(path.join(__dirname, 'UI')));

app.get("/teacher_course", function(req, res) {
    res.sendFile(path.join(__dirname, "UI/teacher_course.html"));
});
app.use('/teacher_course', serveStatic(path.join(__dirname, 'UI')));

app.get("/student_home", function(req, res) {
    res.sendFile(path.join(__dirname, "UI/student_home.html"));
});
app.use('/student_home', serveStatic(path.join(__dirname, 'UI')));

app.get("/student_course", function(req, res) {
    res.sendFile(path.join(__dirname, "UI/student_course.html"));
});
app.use('/student_course', serveStatic(path.join(__dirname, 'UI')));




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
//log in validate and redirect to target page
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
  // find out the user exist or not
  const {Email, Password} = req.body;
  const client = await pool.connect();
  const user = await client.query('SELECT fname,email,userType, password FROM usrInfo WHERE email=$1;',[Email])
  const loginUser = (user) ? user.rows : null;
  
  // compare the password
  try {
      if(await bcrypt.compare(req.body.Password, loginUser[0].password) ){
       
        if (loginUser[0].usertype=="teacher"){
            res.redirect('/teacher_home');
          } 
          else if (loginUser[0].usertype=="student"){
            res.redirect('/student_home');           
          }
      } else {
          res.send('Incorrect username or password')
        }
       client.release();
  } catch (err) {
      console.error(err);
      res.json({ error: err });
      }
    });
 //create a new course  
    app.post('/create', async (req, res) => {
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
          const {courseName, courseContent, credits, numberOfLectures,examDate} = req.body;
          const client = await pool.connect();
          client.query('INSERT INTO courseInfo VALUES (DEFAULT,$1, $2, $3,$4,$5)',[courseName, courseContent, credits, numberOfLectures,examDate]);
      //const results = { 'results': (result) ? result.rows : null};
      //res.json( results );
          res.redirect('/teacher_home')
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