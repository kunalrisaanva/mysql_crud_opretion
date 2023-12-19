import con from "./connection.js";

con.connect(function(error){
    if(error) throw error;
    con.query("SELECT * FROM student;",function(error,result){
        if(error) throw error;
        console.log(result);
    })
})


