var fs = require('fs');
var mysql = require('mysql');
var inquirer = require('inquirer');
// const cTable = require('console.table');
var Table = require('cli-table');
 
// instantiate
var itemTable = new Table({
    head: ['Item ID', 'Product', 'Department', 'Price'],
    colWidths: [10, 15, 15, 10]
});



var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazonDB'
});

connection.connect(function(err){
    if (err) throw err;
    logo();    
});

function logo() {
    fs.readFile('assets/logo.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data)
            openStore();
        };
    });
};

function openStore(){
    connection.query('SELECT * FROM products',
    function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            itemTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]);
        }
        console.log(itemTable.toString());
    })
    connection.end();
};
