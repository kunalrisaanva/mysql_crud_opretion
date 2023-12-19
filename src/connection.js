import mysql2 from "mysql2";


var con = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"kunal",
    database:"school"
})



export default con