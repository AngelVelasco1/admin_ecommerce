-- Active: 1689861893713@@127.0.0.1@3306@adminecommerce
CREATE DATABASE adminEcommerce;
CREATE TABLE customer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(50)
);
CREATE TABLE products(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    stock INT NOT NULL,
    discount_percentage TINYINT(2) NOT NULL DEFAULT '0',
    category INT NOT NULL,
    promotion_id INT,
    FOREIGN KEY (category) REFERENCES categories(id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(id)
);
ALTER TABLE products MODIFY COLUMN category INT DEFAULT '1';

CREATE TABLE purchases (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT,
    product_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE suppliers (
    id INT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
);
CREATE TABLE promotions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL
);
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL
);
INSERT INTO categories (id, name) VALUES (1, "Electronic");
INSERT INTO categories (id, name) VALUES (2, "Clothes");
INSERT INTO categories (id, name) VALUES (3, "Home");
INSERT INTO categories (id, name) VALUES (4, "Beauty and Self care");
INSERT INTO categories (id, name) VALUES (5, "Sports");
INSERT INTO categories (id, name) VALUES (6, "Toys");
INSERT INTO categories (id, name) VALUES (7, "Food");
INSERT INTO categories (id, name) VALUES (8, "Entertaitment");
INSERT INTO categories (id, name) VALUES (9, "Health");

CREATE TABLE product_supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    supplier_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
)
