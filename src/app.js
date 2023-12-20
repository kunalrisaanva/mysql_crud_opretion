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

app.get('/delete-student',((req,res)=>{

    con.connect((error)=>{
      if (error) throw error;
      let sql = 'DELETE FROM student WHERE id =?';
       let id = req.query.id
       con.query(sql,[id],(error ,result)=>{
         if (error) console.log(error);
         console.log(result);
        res.redirect('/students')
       })
    })
 
 }))

 app.get('/update-student',((req,res)=>{

    con.connect((error)=>{
      if (error) throw error;
      let sql = 'SELECT * FROM student WHERE id =?';
       let id = req.query.id
       con.query(sql,[id],(error ,result)=>{
         if (error) console.log(error);
         console.log(result);
        res.render('updateStudent',{student:result})
       })
    })
 
 }))


 app.post('/update-student',((req,res)=>{
    const {name,email,mno ,id} = req.body
    con.connect((error)=>{
      if (error) throw error;
      let sql = 'UPDATE student SET name=? , email=? , mno=? WHERE id =?';
       let id = req.query.id
       con.query(sql,[ name, email, mno, id],(error ,result)=>{
         if (error) console.log(error);
         res.redirect('/students')
        
       })
    })
 
 }))

app.get('/search-students',((req,res)=> {
  con.connect((error)=>{
    if (error) throw error;
    let sql = 'SELECT * FROM student';

     con.query(sql,(error ,result)=>{
       if (error) console.log(error);
       console.log(result);
       res.render("searchStudent",{student:result});
     })
  })
}))


app.get("/search",((req,res) => {

  var name =req.query.name
  var email =req.query.email
  var mno = req.query.mno
  con.connect((error) => {
     if(error) throw error
    let sql = "SELECT * FROM student WHERE name LIKE '%"+name+"%'  AND email LIKE '%"+email+"%' AND mno LIKE '%"+mno+"%'" 
    con.query(sql,(error,result) => {
       if(error) console.log(error);
       res.render('searchStudent',{student:result});
    })
  })

}));


console.log("another branch");




app.listen(port,()=> console.log(`listening on port ${port}`))
