const express = require('express');
const app = express();
const mysql= require('mysql');
const cors= require('cors');

app.use(cors());
app.use(express.json());


var db= mysql.createConnection({
    user: 'root',
    host: 'mysql-ow44-uj8c.cfnfsh1fn4fo.us-west-2.rds.amazonaws.com',
    password: 'ZFgQ4BgSUJFtU1Qg',
    port: 3306,
    database: 'sb'

})

app.get('/menu', (req,res)=>{
    db.query(
        'SELECT * FROM sb.menuDetails', (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
})

app.post('/bookatable', (req,res)=>{
    const name= req.body.name;
    const lastname= req.body.lastname;
    const membercount= req.body.membercount;
    const phonenumber= req.body.phonenumber;
    const email= req.body.email;
    const message= req.body.message;
    const date = new Date();
    db.query(
        'Insert into sb.tablebook (name,lastname,membercount,phonenumber,email,message,date) Values(?,?,?,?,?,?,?)',
        [name,lastname,membercount,phonenumber,email,message,date], (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send("Value Inserted")
            }
        }
    )
})

app.listen(3005, ()=>{
    console.log("running")
})