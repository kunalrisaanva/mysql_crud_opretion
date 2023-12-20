const con  = require('./connection');
const express  =require('express') ;
const path = require('path') 
const app = express();
const bodyParser = require("body-parser");
const { render } = require('ejs');
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'../views'))


app.get("/",((req,res)=> {
  res.sendFile(path.join(__dirname,'../public/register.html'))
}))



app.listen(port,()=> console.log(`listening on port ${port}`))
