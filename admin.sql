-- Active: 1690402556175@@127.0.0.1@3306@adminn
CREATE DATABASE admin;
USE admin;

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL
); 
CREATE TABLE role (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    stock INT NOT NULL,
    discount_percentage TINYINT(2) NOT NULL DEFAULT '0',
    category INT NOT NULL,
    FOREIGN KEY (category) REFERENCES categories (id)
);
CREATE TABLE customer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    address VARCHAR(50),
    email VARCHAR(255),
    role_id INT NOT NULL, 
    FOREIGN KEY (role_id) REFERENCES role (id)
);
CREATE TABLE suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);
CREATE TABLE purchases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT,
    product_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE product_supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    supplier_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
); 

/* Content */
INSERT INTO categories (id, name) VALUES (1, "Electronic");
INSERT INTO categories (id, name) VALUES (2, "Clothes");
INSERT INTO categories (id, name) VALUES (3, "Home");
INSERT INTO categories (id, name) VALUES (4, "Beauty and Self care");
INSERT INTO categories (id, name) VALUES (5, "Sports");
INSERT INTO categories (id, name) VALUES (6, "Toys");
INSERT INTO categories (id, name) VALUES (7, "Food");
INSERT INTO categories (id, name) VALUES (8, "Entertaitment");
INSERT INTO categories (id, name) VALUES (9, "Health");

INSERT INTO role (id, name) VALUES (1, "supplier");
INSERT INTO role (id, name) VALUES (2, "customer");
