'use strict';

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'iboostapplications'
});

connection.connect();


exports.list_all_users = function(req, res) {
    connection.query('SELECT * FROM users ', function (err, rows, fields) {
    if (err){
        console.log('Erroe: list_all_users ', err);
        res.send({ error: true, data: {}, message: err.message });
    }else{
        res.send({ error: false, data: {'rows':rows}, message: 'User List.' });
    }
  });

};


exports.read_a_user = function(req, res) {
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if (err){
            console.log('Erroe: list_all_users ', err);
            res.send({ error: true, data: {}, message: err.message });
        }else{
            res.send({ error: false, data: {'rows':rows}, message: 'User Data.' });
        }
      });
};

exports.create_a_user = function(req, res) {
    connection.query('INSERT INTO users (first_name, last_name, email) VALUES (?,?,?)',[req.body.first_name, req.body.last_name, req.body.email], function (err, rows, fields) {
        if (err){
            console.log('Erroe: list_all_users ', err);
            res.send({ error: true, data: {}, message: err.message });
        }else{
            //res.send({ error: false, data: rows, message: 'User has been updted.' });
            module.exports.list_all_users(req, res);
        }
      });
};


exports.update_a_user = function(req, res) {
    console.log(req.body);
    connection.query('UPDATE users SET first_name=?, last_name=?, email=? WHERE id=?',[req.body.first_name, req.body.last_name, req.body.email, req.body.id], function (err, rows, fields) {
        if (err){
            console.log('Erroe: list_all_users ', err);
            res.send({ error: true, data: {}, message: err.message });
        }else{
            //res.send({ error: false, data: rows, message: 'User has been updted.' });
            module.exports.list_all_users(req, res);
        }
      });
};

exports.delete_a_user = function(req, res) {
    connection.query('DELETE FROM users WHERE id=?',[req.params.id], function (err, rows, fields) {
        if (err){
            console.log('Erroe: list_all_users ', err);
            res.send({ error: true, data: {}, message: err.message });
        }else{
            //res.send({ error: false, data: rows, message: 'User has been deleted.' });
            module.exports.list_all_users(req, res);
        }
      });
};