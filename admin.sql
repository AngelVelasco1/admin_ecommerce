-- Active: 1688557746203@@localhost@3306@adminecommerce
CREATE DATABASE adminEcommerce;

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
CREATE TABLE product_supplier (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    supplier_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
)