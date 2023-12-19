const con  = require('./connection');
const express  =require('express') ;
const path = require('path') 
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'../views'))

app.get("/",((req,res)=> {
  res.sendFile(path.join(__dirname,'../public/register.html'))
}))


app.post('/',((req,res)=>{
 const {name ,email , mno} = req.body;
   con.connect((error)=> {
      if (error) throw error
      let sql = 'INSERT INTO student (name,email,mno) VALUES (?,?,?)'
      let data = [
        [name , email , mno]
      ]
      con.query(sql,[name , email , mno],(error,result)=>{
        if (error) throw error
        res.redirect('/students')
        // res.send({
        //     msg:"data created"+result.insertId,
        // }).status(201)
      })
   })
}));


app.get('/students',((req,res)=>{

   con.connect((error)=>{
     if (error) throw error;
     let sql = 'SELECT * FROM student';

      con.query(sql,(error ,result)=>{
        if (error) console.log(error);
        console.log(result);
        res.render("student",{student:result});
      })
   })

}))



app.listen(7000,()=> console.log('listening on port 7000'))
