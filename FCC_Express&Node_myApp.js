
const express = require('express');
const app = express();

// --> 7)  Mount the Logger middleware here
app.use(function middleware(req, res, next) {
  let result  =`${req.method} ${req.path} - ${req.ip}`;
  // Do something
  console.log(result);
  // Call the next function in line:
  next();
});

// --> 11)  Mount the body-parser middleware  here
let bodyParser = require('body-parser');

/** 1) Meet the node console. */
console.log('Hello World');

/** 2) A first working Express Server */
//app.get('/', (req,res) => res.send('Hello Express'));

/** 3) Serve an HTML file */
app.get('/',(req,res) => res.sendFile(__dirname + '/views/index.html'));

/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
app.get('/json',(req,res)=>res.json({"message": "Hello json"}));

/** 6) Use the .env file to configure the app */
process.env.MESSAGE_STYLE="uppercase";

app.get('/json',(req,res) => {
  let jsonData = {"message": "Hello json"};
  if(process.env.MESSAGE_STYLE==="uppercase") {
    jsonData.message = jsonData.message.toUpperCase(); 
  }
  return res.json(jsonData);
}      
);


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo',(req,res)=>{
  res.json({echo: req.params.word});
})


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, res) {

  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}))


/** 12) Get data form POST  */

app.post('/name', function(req, res) {
  // Handle the data in the request
  var { first: firstName, last: lastName } = req.body;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
