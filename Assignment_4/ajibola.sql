--TO CREATE DATABASE
CREATE DATABASE Inventory_db;

-- TO SELECT DATABASE
USE Inventory_db;

-- TO CREATE Categories Table
CREATE TABLE Categories(
    id  int NOT NULL,
    name varchar(255),
    PRIMARY KEY (id)
)

-- TO CREATE Suppliers Table
CREATE TABLE Suppliers(
    id int NOT NULL,
    name varchar(255),
    phone_number varchar(20),
    PRIMARY KEY (id)
)

--TO CREATE Products Table

CREATE TABLE Products(
    id int NOT NULL,
    name varchar(255),
    description varchar(255),
    size ENUM('small', 'medium', "large", "not specified"),
    purchase_price varchar(20),
    selling_price varchar(20),
    quantity_in_stock int,
    Categories_id int,
    Supplier_id int,
    FOREIGN KEY (Categories_id) REFERENCES Categories(id),
    FOREIGN KEY (Supplier_id) REFERENCES Suppliers(id),
    PRIMARY KEY (id)
)

--TO CREATE Users Table

CREATE TABLE Users(
    id int NOT NULL,
    username varchar(20),
    password varchar(20),
    role ENUM("user", "admin"),
    PRIMARY KEY (id)
)

-- TO CREATE Transactions Table

CREATE TABLE Transactions(
    id int NOT NULL,
    type ENUM("purchase", "sale", "return"),
    Product_id int,
    FOREIGN KEY (Product_id) REFERENCES Products(id),
    PRIMARY KEY (id)
)

-- INSERT INTO Categories Table

INSERT INTO Categories
(id, name)
values (1,"Electronics")

INSERT INTO Categories
(id, name)
values (2, "Apparel")

INSERT INTO Categories
(id, name)
values (3, "Food and Beverage")


-- INSERT INTO Suppliers Table

INSERT INTO Suppliers
(id,name,phone_number)
values (1, "Samsung","08022334455")

INSERT INTO Suppliers
(id,name,phone_number)
values (2, "Nike","08055443322")

INSERT INTO Suppliers
(id,name,phone_number)
values (3, "Ola Farm","08055443333")

-- INSERT INTO Products Table
INSERT INTO Products 
(id,name, description,size,purchase_price,selling_price,quantity_in_stock,Categories_id,Supplier_id)
values(
    1, "Television", "A 56 inches LED-HD TV" ,"large", "#2000", "#3500","5", 1, 1
);


INSERT INTO Products 
(id,name, description,size,purchase_price,selling_price,quantity_in_stock,Categories_id,Supplier_id)
values(
    2, "Nike AirMax", "A Sneakers Manufactured by Nike" ,"Medium", "#200", "#350","10", 2, 2
);

INSERT INTO Products 
(id,name, description,size,purchase_price,selling_price,quantity_in_stock,Categories_id,Supplier_id)
values(
    3, "Yam", "Yams planted and Harvested by Ola Farm" ,"large", "#50", "#80","100", 3, 3
);

INSERT INTO Products 
(id,name, description,size,purchase_price,selling_price,quantity_in_stock,Categories_id,Supplier_id)
values(
    4, "Yams", "Yams planted and Harvested by Ola Farm" ,"large", "#50", "#80","100", 3, 3
);
-- INSERT INTO Users Table

INSERT INTO Users
(id,username,password,role)
values(
    1, "Jibola","testing123", "admin"
)

INSERT INTO Users
(id,username,password,role)
values(
    2, "bola","testing12345", "user"
)

INSERT INTO Users
(id,username,password,role)
values(
    3, "debola","testing1234567", "user"
)

-- INSERT INTO Transactions Table

INSERT INTO Transactions
(id,type,Product_id)
values(
    1, "purchase", 1
)

INSERT INTO Transactions
(id,type,Product_id)
values(
    2, "sale", 2
)

-- Command to select all catergoies in the Categories Table

SELECT * FROM Categories;

-- Command to select all Suppliers in the Suppliers Table

SELECT * FROM Suppliers;

-- Command to select all Product in the Products Table

SELECT * FROM Products;

-- Command to select all Users in the Users Table

SELECT * FROM Users;

-- Command to select all Transaction in the Transactions Table

SELECT * FROM Transactions;

-- Command to update Product in Product Table
UPDATE Products
SET selling_price = "#3000"
WHERE id = 1


-- Command to update Users in Users Table

UPDATE Users
SET role = "admin"
WHERE id = 3;

-- Command to delete Product in Product Table
DELETE FROM Products
WHERE id = 4


-- Command to delete Users in Users Table
DELETE FROM Users
WHERE id = 3


-- select all Products based on Supplier id(joins)

select * from Products join Suppliers on Suppliers.id = Products.Supplier_id;

-- select all Products based on Categories id(joins)

select * from Products join Categories on Categories.id = Products.Categories_id


-- select all Transactions based on Products id(joins)

select * from Transactions join Products on Products.id = Transactions.Product_id


