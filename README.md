## **Study progressing track app**

### **Introduction**

This web app is made for teachers and students to track students’ learning progress in courses.

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
> The app will show messages:
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

### **How to use:**
1. The web app is published on Heroku. The link:https://stark-ridge-06549.herokuapp.com/
2. Create teacher and student accounts to test this WAPP's functions.
3. Or you can test the system by using the following accounts:
- Teacher: anne1@gmail.com  psw:12345.
- Student: bill42@gmail.com   psw:12345.