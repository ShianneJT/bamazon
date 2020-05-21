var fs = require('fs');
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var itemTable = new Table({
    head: ['Item ID', 'Product', 'Department', 'Price', 'Quantity'],
    colWidths: [10, 15, 15, 10, 10]
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
            console.log(data);
            displayItems();
        };
    });
};

function displayItems(){
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            itemTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
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
                message: 'Please type the ID for the item you\'d like to purchase.',
                validate: function (value) {
                    if (isNaN(value) === false && (value > 0 && value <= 10)) {
                        return true;
                    } else {
                        console.log('\n\nPlease enter a number between 1 and 10\n');
                        return false;
                    }
                }
            },
            {
                name: 'qty',
                type: 'input',
                message: 'How many would you like?',
                validate: function (value) {
                    if (isNaN(value)) {
                        console.log('Please enter a numerical value.');
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function(answer){
            connection.query('SELECT * FROM products WHERE ?',
            { item_id: answer.itemID },function(err, res) {
                if (err) throw err;

                if (answer.qty > res[0].stock_quantity){
                    console.log('Insufficient quantity');
                    connection.end();
                } else {
                    var updatedQty = res[0].stock_quantity - answer.qty;
                    console.log('price: ' + res[0].price);
                    var calcTotal = res[0].price * answer.qty;
                    calcTotal = calcTotal.toFixed(2);
                    connection.query('UPDATE products SET stock_quantity=' + updatedQty + ' WHERE item_id=' + answer.itemID);
                    console.log('Order placed! Your total today is: $' + calcTotal + '.');
                    connection.end();
                };
            });
        });
    });
};
