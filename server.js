const express= require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();


//parse request of content-type application/x-form-urlencoded
app.use(bodyParser.urlencoded({
  extended:true
}))

//parse request of content-type application/json
app.use(bodyParser.json());

//Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Successfully connected to the database");
})
.catch(err=>{
  console.log('could not connect to the database');
  process.exit();
});

app.get('/',(req,res)=>{
    res.json({"message":"Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."})
})

require('./app/routes/note.routes')(app);

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});