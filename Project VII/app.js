const express = require("express");
const {projects} = require("./data.json");
const path = require("path");
const pug = require("pug");
const bodyparser = require("body-parser");

const app = express();
//set pug as view
app.set("view engine","pug");
//use body parser
app.use(bodyparser.urlencoded({extended: false}));
//set static route for the html
app.use("/static", express.static("public"));

//Home page route

app.get("/",(req, res, next)=>{
  res.render("index",{projects});
});

// About page route
app.get("/about",(req, res, next)=>{
  res.render("about");
});

// Project page route
app.get("/projects/:id",(req, res, next)=>{
const id = parseInt(req.params.id);

if( id>=0 && id<projects.length){
  const project = projects[id];
  res.render("project",{project});
}
else{
  const err = new Error("This Project does not Exist.");
  err.status = 404;
  next(err);
}
});

//Page not found error handler
app.use(function(req, res, next){
  const err = new Error('Page Not Found')
    err.status = 404;
  next(err);
})

//error middleware
app.use((err, req, res, next)=>{

  // Console Log
  console.error("Error message:", err.message, " - Error status:", err.status);

// Error Page
res.locals.error = err;
res.status(err.status);
res.render("error");

});
// server
app.listen(3000, ()=>{
  console.log("App is running at port 3000");
});
