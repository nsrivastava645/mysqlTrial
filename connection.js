const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: 'neeraj',
    password: process.env.PASS || 'Aug@2021',
    database: 'testingDatabase',
    multipleStatements: true,
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Sucessfully connected to the db');
    } else {
        console.log('Connection failed', err);
    }
});

module.exports = mysqlConnection;