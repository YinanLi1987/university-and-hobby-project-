## **Study progressing track app**

### **Introduction**

This web app is made for teachers and students to track students’ learning progress in courses.

### **How to use:**
1. The web app is published on Heroku. The link:https://stark-ridge-06549.herokuapp.com/
2. Create teacher and student accounts to test this WAPP's functions. As a teacher, you can create a course, and define the schedule of the course, add students to the course, see all the students's study progress traffic lights, and so on. As a student, you can see all the courses you have been added to, change and confirm your learning progress of the course.
3. Or you can test the system by using the following accounts:
- Teacher: anne1@gmail.com  psw:12345.
- Student: bill42@gmail.com   psw:12345.

### **The requirements are:**
> Teachers and students sign in as different user types on the home page. 
> Teachers log in to the teacher page where they can:
1. Create a course, and a teacher can create five courses at the most.
2. Define the course schedule, nine lessons for one course at the most.
3. Add students to the course.
4. Define learning progress tracking.
5. See a summary of a course situation.
6. See the learning progress summary notification.
> Students log in to the student page where they can:
1. See ongoing courses.
2. See reminder for marking learning progress.
3. Mark their learning progress with a traffic light system.
> The app will send notifications :
1. for marking learning progress to the student.
2. Of learning progress summary to the teacher.
### **Technologies:**
1. HTML & CSS for UI.
2. JavaScript for programming.
3. Restful-API for interacting with the database.
4. PostgreSQL for database.
### **Tools:**
1. Visual Studio Code for programming.
2. Figma for views design.
3. Heroku for publishing.
4. GitHub for version control.
5. Node.js for running time.
### **UI:**
1. There are three views: home page, teacher’s home page, and student’s home page.

> Home page for signing and logging in.

![homepage](https://github.com/YinanLi1987/university-and-hobby-project-/blob/main/course_system_WAPP/pictures/Picture%201.jpg?raw=true)



> Teacher’s home page:

![teacherpage](https://github.com/YinanLi1987/university-and-hobby-project-/blob/main/course_system_WAPP/pictures/teacherpage.jpeg?raw=true)


> Student’s home page:

![studentpage](https://github.com/YinanLi1987/university-and-hobby-project-/blob/main/course_system_WAPP/pictures/studentpage.jpg?raw=true)

### **Architecture:**
![architecture](https://github.com/YinanLi1987/university-and-hobby-project-/blob/main/course_system_WAPP/pictures/architecture.jpg?raw=true)


### **Database:**
1. There are three tables
2. ‘Usrinfo’ table: store user’s sign information, used for login verification and set local storage.
3. ‘CourseInfo’ table: store course information created by the teacher, used to set local storage for later use.
4. ‘Trafficlight’ table: store students’ study progress traffic light data, used to display on teachers’ and student’s pages, and when students mark a traffic light, the data will update; this data in this table will be created when the teacher makes a course.
![database](https://github.com/YinanLi1987/university-and-hobby-project-/blob/main/course_system_WAPP/pictures/database.jpg?raw=true)


### **Analysis of the project:**
1.	I completed 9 of 11 requirements of this project. The left two requirements  are ‘The app will send notifications for making learning progress to the student’ and ‘The app will send notifications of learning progress summary to the teacher.’ I am not sure I did it exactly correctly by just showing a reminder message to tell a student how many traffic lights they should mark for the specific course and tell a teacher how many traffic lights need to be marked for the particular course.
2.	This is the first Web APP I made all by myself, Planning, Front-end, Back-end, Testing, and Publishing. It is an acceptable result to me. The most important thing I have learned from this project is the basic process of software development and the connections between different phases.
3.	If I have another chance to do this project again, I want to use some frames like VUE.js. I have learned a crash course on it, and I did not use it this time because I focused on getting to know all the logic clearly in the most basic way.
4.	There are several improvements I want to make:
- Using VUE.js frame or PHP.
- Making relational database. The tables are separate in this version, it is OK when I create a course, but bugs will come up when deleting a course, so I did not add the ‘delete course button’ for this time.
- Making a very detailed Design Document. At this time, I was crossing the river by feeling the stones and took many detours; the original Design Document was not clear enough for guidance.
