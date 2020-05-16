var mysql = require('mysql');
// var inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazonDB'
});

openStore()

function openStore() {
    connection.query('SELECT * FROM products',
        function (err, res) {
            if (err) throw err;

            console.table(res);
            
        }
    );
    connection.end();
};
