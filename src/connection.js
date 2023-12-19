const mysql2 = require("mysql2");


const con = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"kunal",
    database:"practise_demo"
})



module.exports =  con