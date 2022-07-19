Introduction
This web app is made for teachers and students to track students’ learning progress in courses.
The requirements are:
  •	Teachers and students sign in as different user types on the home page. 
  •	Teachers log in to the teacher page where they can:
    1.	Create a course, and a teacher can create five courses at the most.
    2.	Define the course schedule, nine lessons for one course at the most.
    3.	Add students to the course.
    4.	Define learning progress tracking.
    5.	See a summary of a course situation.
    6.	See the learning progress summary notification.
  •	Students log in to the student page where they can:
    1.	See ongoing courses.
    2.	See reminder for marking learning progress.
    3.	Mark their learning progress with a traffic light system.
  •	The app will show messages:
    1.	for marking learning progress to the student.
    2.	Of learning progress summary to the teacher.
Technologies:
  •	HTML & CSS for UI.
  •	JavaScript for programming.
  •	Restful-API for interacting with the database.
  •	PostgreSQL for database.
Tools:
  •	Visual Studio Code for programming.
  •	Figma for views design.
  •	Heroku for publishing.
  •	GitHub for version control.
UI:
•	There are three views: home page, teacher’s home page, and student’s home page.
•	Home page for signing and logging in.

 

•	Teacher’s home page:
 

•	Student’s home page:
 
Architecture:


 
Database:
  •	There are three tables
  •	‘Usrinfo’ table: store user’s sign information, used for login verification and set local storage.
  •	‘CourseInfo’ table: store course information created by the teacher, used to set local storage for later use.
  •	‘Trafficlight’ table: store students’ study progress traffic light data, used to display on teachers’ and student’s pages, and when students mark a traffic light, the data will update; this data in this table will be created when the teacher makes a course.
 
How to use:
  •	The web app is published on Heroku. The link:
      https://stark-ridge-06549.herokuapp.com/
  •	Create teacher and student accounts to test this WAPP's functions.
  •	Or you can test the system by using the following accounts:
      Teacher: anne1@gmail.com  psw:12345
      Student: bill42@gmail.com   psw:12345


![image](https://user-images.githubusercontent.com/89730712/179812503-630e327e-0f43-4871-aab0-54dcf70d8d40.png)
