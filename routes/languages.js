const express = require('express');
const mysqlConnection = require('../connection');
const Router = express.Router();

Router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM programming_languages', (err, rows) => {
        if(!err){
            res.send({rows});
        } else {
            console.log(err);
        }
    });
});

Router.get('/:name',(req,res)=>{
    let name = req.params.name;
    mysqlConnection.query(`SELECT * FROM programming_languages WHERE name='${name}'`, (err, rows) => {
        if(!err){
            res.send({rows});
        } else {
            console.log(err);
        }
    });
});

Router.post('/add', (req, res, next)=>{
    let name = req.body.name;
    let released_year = req.body.released_year;
    let githut_rank = req.body.githut_rank; 
    let pypl_rank = req.body.pypl_rank;
    let tiobe_rank = req.body.tiobe_rank;
    let errors = false;
    if(name.length === 0){
        errors = true;
        res.send({errors});
    }
    if(!errors){
        let data = {
            name : name,
            released_year : released_year,
            githut_rank : githut_rank, 
            pypl_rank : pypl_rank,
            tiobe_rank : tiobe_rank
        }
        //insertion
        mysqlConnection.query(
            `INSERT INTO programming_languages SET ?`, 
            data, 
            (err, result) => {
                 if(err) throw err;
                 res.send({message: result});
                });
    }
});

Router.put('/update/:id', (req, res, next) => { 
    let id = req.params.id;
    let name = req.body.name;
    let released_year = req.body.released_year;
    let githut_rank = req.body.githut_rank; 
    let pypl_rank = req.body.pypl_rank;
    let tiobe_rank = req.body.tiobe_rank;
    let errors = false;
    if(name.length === 0){
        errors = true;
        res.send({errors});
    }
    if(!errors){
        let data = {
            name : name,
            released_year : released_year,
            githut_rank : githut_rank, 
            pypl_rank : pypl_rank,
            tiobe_rank : tiobe_rank
        }
        //updation
        mysqlConnection.query(
            `UPDATE programming_languages SET ? WHERE id = ${id}`, 
            data, 
            (err, result) => {
                 if(err) throw err;
                 res.send({message: result});
        });
    }
});

Router.delete('/delete/:id', function(req, res, next) {
   let id = req.params.id;
   mysqlConnection.query(`DELETE FROM programming_languages WHERE id = ${id}`, function( err, result){
       if(err) throw err;
       res.send({message: result});
   });
});

module.exports = Router;