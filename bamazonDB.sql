CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
    item_id INT PRIMARY KEY AUTO_INCREMENT, 
    product_name VARCHAR(255),
    department_name VARCHAR(255),
    price DEC(10 , 2) NOT NULL,
    stock_quantity INT(10) NOT NULL
); 

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
 ('computer', 'electronics', 899.99, 3),
 ('sweater', 'clothing', 19.99, 5),
 ('nintendo', 'electronics', 399.99, 1),
 ('teddy bear', 'toys', 6.99, 4),
 ('bed sheets', 'home', 29.99, 8),
 ('purse', 'accessories', 9.99, 4),
 ('watch', 'jewlery', 14.99, 7),
 ('jigsaw puzzle', 'toys', 6.99, 5),
 ('pillow', 'home', 10.99, 7),
 ('tshirt', 'clothing', 9.99, 3);
