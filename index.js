const express = require("express")
const app = express();

const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json()) ;
app.set('view engine', 'ejs')

// init arrays of courses and students 
var courses = 
[
  { id: 1 , name :"course 1" , code : "CSE111" ,description: "it is computer course" },
  { id: 2 , name :"course 2" , code : "CSE222" ,description: "it is computer course" },
  { id: 3 , name :"course 3" , code : "CSE333" ,description: "it is computer course"}
];

var students = 
[
  { id: 1 , name :"student 1" , code : "1500392"},
  { id: 2 , name :"student 2" , code : "1500391"},
  { id: 3 , name :"student 3" , code : "1500390"}
];

// get create forms
app.get('/web/courses/create', function(req, res){
    res.sendFile(__dirname + '/views/addCourse.html'); });

app.get('/web/students/create', function(req, res){
    res.sendFile(__dirname + '/views/addStudent.html'); });

//routes

app.get('/api/courses', function(req, res){
    res.render('courses' , 
    {courses : courses})
    // res.send(courses)
    });

app.get('/api/courses/update/:id', function(req, res){
    res.render('courses' , 
    {courses : courses})
    });

app.get('/api/courses/delete/:id', function(req, res){
    res.render('courses' , 
    {courses : courses})
    });


app.get('/api/students', function(req, res){
    res.render('students' , 
    {students : students})
    // res.send(students)
    });

app.get('/api/students/update/:id', function(req, res){
    res.render('students' , 
    {students : students})
    });

app.get('/api/students/delete/:id', function(req, res){
    res.render('students' , 
    {students : students})
    });
    

//post request to add new course 
app.post('/api/courses' , (req,res) => {
    const course = {
        id : courses.length + 1,
        name : req.body.name ,
        code : req.body.code , 
        description : req.body.description
    };
if ( req.body.name.length < 5 || !req.body.name )
{
 res.status(400).send("the name is required with min length of 5 characters")
}

else if (!req.body.code ||  req.body.code.length != 6 )
{
    res.status(400).send("the code is required and must match 3 letters followed by 3 numbers")
}

else if (req.body.description >= 200){
  res.status(400).send("the description should be 200 characters as max length")
}

else {
    courses.push(course);
    // res.render('courses' , {courses : courses})
   res.send(course)
}

});

app.post('/api/students' , (req,res) => {
    const student = {
        id :   students.length + 1,
        name : req.body.name ,
        code : req.body.code 
    };

    if ( !req.body.name )
    {
     res.status(400).send("the name is required")
    }
    else if ( !req.body.code ||  req.body.code.length != 7 )
    {
     res.status(400).send("the code is required and must match 7 characters")
    }
    else {
        students.push(student);
        // res.render('students' , {students : students})
        res.send(student)
    }

});

// //put "update" request to update course 
app.put('/api/courses/update/:id', (req,res) => {
var course =  courses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send("the given id not found")   //404
course.name = req.body.name ;
course.code = req.body.code ;
course.description = req.body.description;
res.send(course);
});

app.put('/api/students/update/:id', (req,res) => {
var student =  students.find(c => c.id === parseInt(req.params.id));
if (!student) res.status(404).send("the given id not found")   //404

student.name = req.body.name ;
student.code = req.body.code ;
res.send(student);

});

    
//delete  request to delete course 
app.delete('/api/courses/delete/:id', (req,res) => {
    var course =  courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("the given id not found")   //404
    const index = courses.indexOf(course);
    courses.splice(index , 1) ;
    res.send(course);
    });


 app.delete('/api/students/delete/:id', (req,res) => {
    var student =  students.find(c => c.id === parseInt(req.params.id));
    if (!student) res.status(404).send("the given id not found")   //404
    const index = students.indexOf(student);
    students.splice(index , 1) ;
    res.send(student);
    }); 



//to make the value as enviroment value 
const host = '0.0.0.0';
const port = process.env.PORT || 3000 ;
app.listen(port ,host , () => console.log(`listening in port ${port}`))
