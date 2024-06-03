import mysql from 'mysql2'

const connection = mysql.createConnection({ 
  host:'localhost',
  user:'root',
  password:'',
  database:'gym_system'
});

connection.connect((err)=>{
  if (err){
    return console.error("Connection is falid :",err);
  }
  console.log("connection to db is success");
})

export default connection