//////////////homepage////////////////////////////
// delete the saved data in localStorage of last login
   function loadEmail() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("courseNames");
}
//get all the courses created by the login teacher
function loadJason(){
    let userEmail=localStorage.getItem("userEmail");
    //create XHR Object
    var xhr = new XMLHttpRequest();
    //open -type, url/file,async
    xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/courseinfo', true);
    xhr.onload=function(){
        if(this.status==200){
            var courses=JSON.parse (this.responseText);
            var courseNames=[];
            for(var i in courses){
                if(courses[i].teacher=userEmail){
                    courseNames.push(courses[i].coursename);
                }  
            }
            localStorage.setItem("courseNames",JSON.stringify(courseNames));
        }
    }
xhr.send();
}
/////////////////////teacher page////////////////////////////
//show login user name
function loginUser(){
    let userEmail=localStorage.getItem("userEmail");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/userinfo', true);
    xhr.onload=function(){
        if(this.status==200){
            var userInfo=JSON.parse (this.responseText);
            var userIndex=userInfo.map(object => object.email).indexOf(userEmail);
            var username=userInfo[userIndex].fname;   
            document.getElementById("user").innerText=username;
        }
    } 
xhr.send();
} 
//get all courses created by the login user, make it a array and store in localStorage for later use.
function loadJason(){
    let userEmail=localStorage.getItem("userEmail");
    document.getElementById("teacherName").value=userEmail;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/courseinfo', true);
    xhr.onload=function(){
        if(this.status==200){
            var courses=JSON.parse (this.responseText);
            var courseNames=[];
            for(var i in courses){
                if(courses[i].teacher=userEmail){
                    courseNames.push(courses[i].coursename);
                }  
            }
            localStorage.setItem("courseNames",JSON.stringify(courseNames));
        }
    }
xhr.send();
}
// students list for creating course by the teacher
function studentslist(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/dbstudent', true);
    xhr.onload=function(){
        if(this.status==200){
            var studentInfo=JSON.parse (this.responseText);
            var output='';
            for(var i in studentInfo){
                output+='<input type="checkbox" name="students" value='+studentInfo[i].email+'>'+studentInfo[i].fname+' '+studentInfo[i].lname+'</input>';
            }
            document.getElementById("students").innerHTML=output;
        }
    }
xhr.send();
}
// show courses and students' study traffic lights 
function loadLight(){
        let userEmail=localStorage.getItem("userEmail");
        let courseArray=JSON.parse(localStorage.getItem("courseNames"));
        console.log(courseArray);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/trafficlights', true);
        xhr.onload=function(){
            if(this.status==200){
                var lightList=JSON.parse (this.responseText);
                var output1='';
                var output2='';
                var output3='';
                var output4='';
                var output5='';
                const today = new Date().toISOString().slice(0, 10);
                    //display the first course
                    for(i in lightList){
                        if(courseArray[0]==lightList[i].coursename && lightList[i].teacher==userEmail){
                            output1+=lightList[i].studentemail
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson01+'; border:1px solid black;">'+lightList[i].date01+lightList[i].lesson01+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson02+'; border:1px solid black;">'+lightList[i].date02+lightList[i].lesson02+'</span>'   
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson03+'; border:1px solid black;">'+lightList[i].date03+lightList[i].lesson03+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson04+'; border:1px solid black;">'+lightList[i].date04+lightList[i].lesson04+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson05+'; border:1px solid black;">'+lightList[i].date05+lightList[i].lesson05+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson06+'; border:1px solid black;">'+lightList[i].date06+lightList[i].lesson06+'</span>'   
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson07+'; border:1px solid black;">'+lightList[i].date07+lightList[i].lesson07+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson08+'; border:1px solid black;">'+lightList[i].date08+lightList[i].lesson08+'</span>'  
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson09+'; border:1px solid black;">'+lightList[i].date09+lightList[i].lesson09+'</span>'
                                    +'<br/>'+'<br/>'; 
                        }
                    }
                    //display the second course
                    for(i in lightList){
                        if(courseArray[1]==lightList[i].coursename && lightList[i].teacher==userEmail){
                            output2+=lightList[i].studentemail
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson01+'; border:1px solid black;">'+lightList[i].date01+lightList[i].lesson01+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson02+'; border:1px solid black;">'+lightList[i].date02+lightList[i].lesson02+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson03+'; border:1px solid black;">'+lightList[i].date03+lightList[i].lesson03+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson04+'; border:1px solid black;">'+lightList[i].date04+lightList[i].lesson04+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson05+'; border:1px solid black;">'+lightList[i].date05+lightList[i].lesson05+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson06+'; border:1px solid black;">'+lightList[i].date06+lightList[i].lesson06+'</span>'   
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson07+'; border:1px solid black;">'+lightList[i].date07+lightList[i].lesson07+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson08+'; border:1px solid black;">'+lightList[i].date08+lightList[i].lesson08+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson09+'; border:1px solid black;">'+lightList[i].date09+lightList[i].lesson09+'</span>'
                                    +'<br/>'+'<br/>';
                        }
                    }
                    //display the third course
                    for(i in lightList){
                        if(courseArray[2]==lightList[i].coursename && lightList[i].teacher==userEmail){
                            output3+=lightList[i].studentemail
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson01+'; border:1px solid black;">'+lightList[i].date01+lightList[i].lesson01+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson02+'; border:1px solid black;">'+lightList[i].date02+lightList[i].lesson02+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson03+'; border:1px solid black;">'+lightList[i].date03+lightList[i].lesson03+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson04+'; border:1px solid black;">'+lightList[i].date04+lightList[i].lesson04+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson05+'; border:1px solid black;">'+lightList[i].date05+lightList[i].lesson05+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson06+'; border:1px solid black;">'+lightList[i].date06+lightList[i].lesson06+'</span>'   
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson07+'; border:1px solid black;">'+lightList[i].date07+lightList[i].lesson07+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson08+'; border:1px solid black;">'+lightList[i].date08+lightList[i].lesson08+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson09+'; border:1px solid black;">'+lightList[i].date09+lightList[i].lesson09+'</span>'
                                    +'<br/>'+'<br/>';
                        }
                    }
                    //display the fourth course
                    for(i in lightList){
                        if(courseArray[3]==lightList[i].coursename && lightList[i].teacher==userEmail){
                            output4+=lightList[i].studentemail
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson01+'; border:1px solid black;">'+lightList[i].date01+lightList[i].lesson01+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson02+'; border:1px solid black;">'+lightList[i].date02+lightList[i].lesson02+'</span>'    
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson03+'; border:1px solid black;">'+lightList[i].date03+lightList[i].lesson03+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson04+'; border:1px solid black;">'+lightList[i].date04+lightList[i].lesson04+'</span>'  
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson05+'; border:1px solid black;">'+lightList[i].date05+lightList[i].lesson05+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson06+'; border:1px solid black;">'+lightList[i].date06+lightList[i].lesson06+'</span>'    
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson07+'; border:1px solid black;">'+lightList[i].date07+lightList[i].lesson07+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson08+'; border:1px solid black;">'+lightList[i].date08+lightList[i].lesson08+'</span>'  
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson09+'; border:1px solid black;">'+lightList[i].date09+lightList[i].lesson09+'</span>'
                                    +'<br/>'+'<br/>';
                        }
                    }
                    //display the fifth course
                    for(i in lightList){
                        if(courseArray[4]==lightList[i].coursename && lightList[i].teacher==userEmail){
                            output5+=lightList[i].studentemail
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson01+'; border:1px solid black;">'+lightList[i].date01+lightList[i].lesson01+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson02+'; border:1px solid black;">'+lightList[i].date02+lightList[i].lesson02+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson03+'; border:1px solid black;">'+lightList[i].date03+lightList[i].lesson03+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson04+'; border:1px solid black;">'+lightList[i].date04+lightList[i].lesson04+'</span>' 
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson05+'; border:1px solid black;">'+lightList[i].date05+lightList[i].lesson05+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson06+'; border:1px solid black;">'+lightList[i].date06+lightList[i].lesson06+'</span>'  
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson07+'; border:1px solid black;">'+lightList[i].date07+lightList[i].lesson07+'</span>'
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson08+'; border:1px solid black;">'+lightList[i].date08+lightList[i].lesson08+'</span>'  
                                    +' '+' '+'<span style="background-color:'+lightList[i].lesson09+'; border:1px solid black;">'+lightList[i].date09+lightList[i].lesson09+'</span>'
                                    +'<br/>'+'<br/>';
                        }
                    }
                    document.getElementById("courseList1").innerHTML='<h2 style="margin:2 auto">'+courseArray[0]+'</h2>'+'<div id="message1" style="background-color: #00BFB2;color:black;width:500px;"></div>'+'<br/>'+output1
                    document.getElementById("courseList2").innerHTML='<h2 style="margin:2 auto">'+courseArray[1]+'</h2>'+'<div id="message2" style="background-color: #00BFB2;color:black;width:500px;"></div>'+'<br/>'+output2
                    document.getElementById("courseList3").innerHTML='<h2 style="margin:2 auto">'+courseArray[2]+'</h2>'+'<div id="message3" style="background-color: #00BFB2;color:black;width:500px;"></div>'+'<br/>'+output3
                    document.getElementById("courseList4").innerHTML='<h2 style="margin:2 auto">'+courseArray[3]+'</h2>'+'<div id="message4" style="background-color: #00BFB2;color:black;width:500px;"></div>'+'<br/>'+output4
                    document.getElementById("courseList5").innerHTML='<h2 style="margin:2 auto">'+courseArray[4]+'</h2>'+'<div id="message5" style="background-color: #00BFB2;color:black;width:500px;"></div>'+'<br/>'+output5  
                }
            }
            xhr.send();
        }
//show message about how many traffic lights need to be marked
function message(){
    let  unmarked1=Number(0);
    let userEmail=localStorage.getItem("userEmail");
    let courseArray=JSON.parse(localStorage.getItem("courseNames"));
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/trafficlights', true);
    xhr.onload=function(){
        if(this.status==200){
            var courses=JSON.parse (this.responseText);
            var  unmarked2=Number(0);
            var  unmarked3=Number(0);
            var  unmarked4=Number(0);
            var  unmarked5=Number(0);
            const today = new Date().toISOString().slice(0, 10);
            //how many traffic lights need to be marked of the first course
            for(i in courses) {
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date01<today && courses[i].lesson01=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date02<today && courses[i].lesson02=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date03<today && courses[i].lesson03=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date04<today && courses[i].lesson04=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date05<today && courses[i].lesson05=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date06<today && courses[i].lesson06=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date07<today && courses[i].lesson07=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date08<today && courses[i].lesson08=="Unmark"){
                    unmarked1 +=1;
                }
                if(courseArray[0]==courses[i].coursename && courses[i].teacher==courses && courses[i].date09<today && courses[i].lesson09=="Unmark"){
                    unmarked1 +=1;
                }
            }  
           //how many traffic lights need to be marked of the second course
            for(i in courses) {
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date01<today && courses[i].lesson01=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date02<today && courses[i].lesson02=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date03<today && courses[i].lesson03=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date04<today && courses[i].lesson04=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date05<today && courses[i].lesson05=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date06<today && courses[i].lesson06=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date07<today && courses[i].lesson07=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date08<today && courses[i].lesson08=="Unmark"){
                    unmarked2 +=1;
                }
                if(courseArray[1]==courses[i].coursename && courses[i].teacher==courses && courses[i].date09<today && courses[i].lesson09=="Unmark"){
                    unmarked2 +=1;
                }
            }  
            //how many traffic lights need to be marked of the third course
            for(i in courses) {
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date01<today && courses[i].lesson01=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date02<today && courses[i].lesson02=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date03<today && courses[i].lesson03=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date04<today && courses[i].lesson04=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date05<today && courses[i].lesson05=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date06<today && courses[i].lesson06=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date07<today && courses[i].lesson07=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date08<today && courses[i].lesson08=="Unmark"){
                    unmarked3 +=1;
                }
                if(courseArray[2]==courses[i].coursename && courses[i].teacher==courses && courses[i].date09<today && courses[i].lesson09=="Unmark"){
                    unmarked3 +=1;
                }
            }  
            //how many traffic lights need to be marked of the fourth course
            for(i in courses) {
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date01<today && courses[i].lesson01=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date02<today && courses[i].lesson02=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date03<today && courses[i].lesson03=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date04<today && courses[i].lesson04=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date05<today && courses[i].lesson05=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date06<today && courses[i].lesson06=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date07<today && courses[i].lesson07=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date08<today && courses[i].lesson08=="Unmark"){
                    unmarked4 +=1;
                }
                if(courseArray[3]==courses[i].coursename && courses[i].teacher==courses && courses[i].date09<today && courses[i].lesson09=="Unmark"){
                    unmarked4 +=1;
                }
            }  
            //how many traffic lights need to be marked of the fifth course
            for(i=0; i<courses.length; i++) {
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date01<today && courses[i].lesson01=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date02<today && courses[i].lesson02=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date03<today && courses[i].lesson03=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date04<today && courses[i].lesson04=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date05<today && courses[i].lesson05=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date06<today && courses[i].lesson06=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date07<today && courses[i].lesson07=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==userEmail && courses[i].date08<today && courses[i].lesson08=="Unmark"){
                    unmarked5 +=1;
                }
                if(courseArray[4]==courses[i].coursename && courses[i].teacher==courses && courses[i].date09<today && courses[i].lesson09=="Unmark"){
                    unmarked5 +=1;
                }
            }  
         
            document.getElementById("message1").innerHTML="There are "+unmarked1+" traffic lights need to mark in this course.";
            document.getElementById("message2").innerHTML="There are "+unmarked2+" traffic lights need to mark in this course.";
            document.getElementById("message3").innerHTML="There are "+unmarked3+" traffic lights need to mark in this course.";
            document.getElementById("message4").innerHTML="There are "+unmarked4+" traffic lights need to mark in this course.";
            document.getElementById("message5").innerHTML="There are "+unmarked5+" traffic lights need to mark in this course.";
        }
        console.log(courseArray[2])
    }
    xhr.send();
}
////////////////////////////student page////////////////////////////////////////////
 
        // show how many courses this student have taken   
        function courseOfStudent(){
            let userEmail=localStorage.getItem("userEmail");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://stark-ridge-06549.herokuapp.com/trafficlights', true);
            xhr.onload=function(){
                if(this.status==200){
                    var trafficLight=JSON.parse (this.responseText);
                    const today = new Date().toISOString().slice(0, 10);
                    let unmarkedLight=Number(0);
                    output='';
                    for(var i in trafficLight){
                        if(trafficLight[i].studentemail==userEmail){
                            if(trafficLight[i].date01<today && trafficLight[i].lesson01=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date02<today && trafficLight[i].lesson02=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date03<today && trafficLight[i].lesson03=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date04<today && trafficLight[i].lesson04=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date05<today && trafficLight[i].lesson05=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date06<today && trafficLight[i].lesson06=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date07<today && trafficLight[i].lesson07=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date08<today && trafficLight[i].lesson08=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
                            if(trafficLight[i].date09<today && trafficLight[i].lesson09=="Unmark"){
                                unmarkedLight+=1;
                            }else{
                                unmarkedLight+=0;
                            }
    
                    output+='<form action="/confirm" method="POST">'
                            +'<input type="hidden" name="studentEmail" value="'+userEmail+'" >'    
                            +'<input name=courseName value="'+trafficLight[i].coursename+'" ></input>'+'<br />'+'<br />'
                            +'<lable for='+trafficLight[i].date01+'>'+trafficLight[i].date01+'</lable>'
                            +'<select type="text" id='+trafficLight[i].date01+' name="lesson01" style="background-color:'+trafficLight[i].lesson01+'">'
                                +'<option value="'+trafficLight[i].lesson01+'">'+trafficLight[i].lesson01+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option  value="Yellow">Yellow</option>'
                                +'<option  value="Red" >Red</option>'
                            +'</select>'
                            +'<lable for='+trafficLight[i].date02+'>'+trafficLight[i].date02+'</lable>'
                            +'<select type="text"  id='+trafficLight[i].date02+' name="lesson02" style="background-color:'+trafficLight[i].lesson02+'" >'
                                +'<option value="'+trafficLight[i].lesson02+'">'+trafficLight[i].lesson02+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date03+'>'+trafficLight[i].date03+'</lable>'
                            +'<select type="text"  id='+trafficLight[i].date03+' name="lesson03" style="background-color:'+trafficLight[i].lesson03+'" >'
                                +'<option value="'+trafficLight[i].lesson03+'">'+trafficLight[i].lesson03+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date04+'>'+trafficLight[i].date04+'</lable>'
                            +'<select type="text" id='+trafficLight[i].date04+' name="lesson04" style="background-color:'+trafficLight[i].lesson04+'">'
                                +'<option value="'+trafficLight[i].lesson04+'">'+trafficLight[i].lesson04+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date05+'>'+trafficLight[i].date05+'</lable>'
                            +'<select type="text"  id='+trafficLight[i].date05+' name="lesson05" style="background-color:'+trafficLight[i].lesson05+'" >'
                                +'<option value="'+trafficLight[i].lesson05+'">'+trafficLight[i].lesson05+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date06+'>'+trafficLight[i].date06+'</lable>'
                            +'<select type="text"  id='+trafficLight[i].date06+' name="lesson06" style="background-color:'+trafficLight[i].lesson06+'">'
                                +'<option value="'+trafficLight[i].lesson06+'">'+trafficLight[i].lesson06+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date07+'>'+trafficLight[i].date07+'</lable>'
                            +'<select type="text"  id='+trafficLight[i].date07+' name="lesson07" style="background-color:'+trafficLight[i].lesson07+'">'
                                +'<option value="'+trafficLight[i].lesson07+'">'+trafficLight[i].lesson07+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date08+'>'+trafficLight[i].date08+'</lable>'
                            +'<select type="text" id='+trafficLight[i].date08+' name="lesson08" style="background-color:'+trafficLight[i].lesson08+'">'
                                +'<option value="'+trafficLight[i].lesson08+'">'+trafficLight[i].lesson08+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'   
                            +'<lable for='+trafficLight[i].date09+'>'+trafficLight[i].date09+'</lable>'
                            +'<select type="text"  id='+trafficLight[i].date09+' name="lesson09" style="background-color:'+trafficLight[i].lesson09+'">'
                                +'<option value="'+trafficLight[i].lesson09+'">'+trafficLight[i].lesson09+'</option>'
                                +'<option value="Green">Green</option>'
                                +'<option value="Yellow">Yellow</option>'
                                +'<option value="Red" >Red</option>'
                            +'</select>'                            
                            +'<input type="submit" value="Confirm"></input>'+'</form>'
                            +'<br />'
                            +'<p>Message : You have '+unmarkedLight+' traffic light need to be marked for this course.<p>'
                            +'<br />'+'<br />';   
                        }
                    }
                    document.getElementById("courseList").innerHTML=output;
                }
            }
            xhr.send();
        }