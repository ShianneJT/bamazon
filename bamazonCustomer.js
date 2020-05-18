var fs = require('fs');
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
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
        } else {
            console.log(data)
            displayItems();
        };
    });
};

function displayItems(){
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            itemTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]);
        }
        console.log(itemTable.toString());
        chooseItem();
    });
   // connection.end();
};

function chooseItem(){
    connection.query('SELECT item_id FROM products', function (err, res){
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'itemID',
                type: 'input',
                message: 'Please type the ID for the item you\'d like to purchase.'
            },
            {
                name: 'qty',
                type: 'input',
                message: 'How many would you like?'
            }
        ]).then(function(answer){
            connection.query('SELECT * FROM products WHERE ?',
            { item_id: answer.itemID },function(err, res) {
                if (err) throw err;

                if (answer.qty > res[0].stock_quantity){
                    console.log('Insufficient quantity');
                    connection.end();
                } else {
                    console.log('In stock!');
                    connection.end();
                };
            });
        });
    });
};

// show customer total cost of their purchase
