const app = require("express")();
const parser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const url = "mongodb://localhost:27017/meanstack";

//middleware enable data ~ POST
app.use( parser.urlencoded( {extended:true} ) );   
app.use( parser.json() );                        
app.use( cors() );

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(url, options);
mongoose.connection

Course = require("./router/course.router.js");

// ==== Middleware ====
/*
http://localhost:9090/course/getCourseDetails   
http://localhost:9090/course/addCourseDetails    
  => rest client or post man 
  {"_id":109, "name":"Computer", "description":"CS coolness", "amount":52}
http://localhost:9090/course/deleteCourseById/101
http://localhost:9090/course/updateProductPrice  
  => update amount using id 
  {"_id":109,"amount":26}
*/

app.use("/course", Course)

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/html/index.html');
})

app.get('/addCourse', (req,res) => {
  res.sendFile(__dirname + '/html/addCourse.html');
}) 

app.get('/updateCourse', (req,res) => {
  res.sendFile(__dirname + '/html/updateCourse.html');
}) 

app.get('/deleteCourse', (req,res) => {
  res.sendFile(__dirname + '/html/deleteCourse.html');
}) 

app.get('/listCourses', (req,res) => {
  res.sendFile(__dirname + '/html/listCourses.html');
}) 

const port = 4200
app.listen(port, () => console.log(`Server running on port number ${port}`));

