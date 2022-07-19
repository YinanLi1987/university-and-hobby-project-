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
app.get('/courseinfo', async (req, res) => {
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
        const result = await client.query('SELECT * FROM courseInfo;');
        const results =  (result) ? result.rows : null;
        res.json( results );
        client.release();
    } catch (err) {
          console.error(err);
          res.json({ error: err });
          }
      });
      // get data from table usrInfo
app.get('/userinfo', async (req, res) => {
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
        const result = await client.query('SELECT * FROM usrInfo');
        const results = (result) ? result.rows : null;
        res.json( results);
        client.release();
    } catch (err) {
          console.error(err);
          res.json({ error: err });
          }
      });
//get all data of traffic light
// get data from table usrInfo
app.get('/trafficlights', async (req, res) => {
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
        const result = await client.query('SELECT * FROM trafficLight;');
        const results =  (result) ? result.rows : null;
        res.json( results );
        client.release();
    } catch (err) {
          console.error(err);
          res.json({ error: err });
          }
      });
// get all students fname and lname 
app.get('/dbstudent', async (req, res) => {
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
        const result = await client.query('SELECT * FROM usrInfo where usertype=$1;',["student"]);
        const results = (result) ? result.rows : null;
        res.json( results);
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
          const {fname, lname, email,userType,password} = req.body;
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          const client = await pool.connect();
          client.query('INSERT INTO usrInfo VALUES (DEFAULT,$1, $2, $3,$4,$5)',[fname, lname,email,userType,hashedPassword]);
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
          const {courseName, lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08,lesson09,students,teacher} = req.body;
          const client = await pool.connect();
          client.query('INSERT INTO courseInfo VALUES (DEFAULT,$1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[courseName, students,lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08,lesson09,teacher]);
          for(i=0;i<students.length;i++) {
              client.query('INSERT INTO trafficLight VALUES (DEFAULT,$1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)',[students[i],courseName,'Unmark','Unmark','Unmark','Unmark','Unmark','Unmark','Unmark','Unmark','Unmark',lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08,lesson09,teacher])
          }
      //const results = { 'results': (result) ? result.rows : null};
      //res.json( results );
          res.redirect('/teacher_home')
          client.release();
      } catch (err) {
            console.error(err);
            res.json({ error: err });
        }
      });

// confirm the status of traffic light

    app.post('/confirm', async (req, res) => {
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
          const {studentEmail, courseName,lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08, lesson09} = req.body;
       
          const client = await pool.connect();
          client.query('UPDATE trafficLight SET lesson01=$3, lesson02=$4, lesson03=$5, lesson04=$6, lesson05=$7, lesson06=$8, lesson07=$9, lesson08=$10, lesson09=$11 WHERE studentEmail=$1 AND courseName=$2 ',[studentEmail,courseName,lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08, lesson09]);
        
      //const results = { 'results': (result) ? result.rows : null};
      //res.json( results );
          res.redirect('/student_home')
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