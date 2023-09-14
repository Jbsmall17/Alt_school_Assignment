// Command to create collection inot Inventory-db database

db.createCollection("Products");
db.createCollection("Categories");
db.createCollection("Suppliers");
db.createCollection("Users");
db.createCollection("Transactions");

// insert data into Catergories collection

db.Categories.insertOne({_id: 1, name: "Electronics", createAt : Date()});

db.Categories.insertOne({_id: 2, name: "Apparel", createAt : Date()});

db.Categories.insertOne({_id: 3, name: "Food and Beverage", createAt : Date()});

// insert data into Suppliers collection

db.Suppliers.insertOne({_id: 1, name: "Samsung",phone_number: "08022334455", createAt : Date()});

db.Suppliers.insertOne({_id: 2, name: "Nike" ,phone_number: "08055443322", createAt : Date()});

db.Suppliers.insertOne({_id: 3, name: "Ola Farm" ,phone_number: "08055443333", createAt : Date()});


// insert data into Products collection

db.Products.insertOne({
    _id : 1,
    name : "Television",
    description :  "A 56 inches LED-HD TV",
    size : "large",
    purchase_price : "#2000" , 
    selling_price: "#3500", 
    quantity_in_stock : "5",
    Categories_id :  1,
    Supplier_id :  1
})

db.Products.insertOne({
    _id : 2,
    name : "Nike AirMax",
    description :  "A Sneakers Manufactured by Nike",
    size : "Medium",
    purchase_price : "#200",
    selling_price: "#350",
    quantity_in_stock : "10",
    Categories_id :  2,
    Supplier_id :  2
})

db.Products.insertOne({
    _id : 3,   
    name : "Yam",
    description : "Yams planted and Harvested by Ola Farm" ,
    size : "large",
    purchase_price : "#50",
    selling_price: "#80",
    quantity_in_stock : "100",
    Categories_id :  3,
    Supplier_id :   3
})

db.Products.insertOne({
    _id : 4,   
    name : "Yams",
    description : "Yams planted and Harvested by Ola Farm" ,
    size : "large",
    purchase_price : "#50",
    selling_price: "#80",
    quantity_in_stock : "100",
    Categories_id :  3,
    Supplier_id :   3
})

// insert data into Users collection

db.Users.insertOne({
    _id : 1,  
    username : "Jibola",
    password : "testing123",
    role :  "admin"
})

db.Users.insertOne({
    _id : 2, 
    username : "bola",
    password : "testing12345",
    role :  "user"
})

db.Users.insertOne({
    _id :  3,  
    username : "debola",
    password : "testing1234567",
    role : "user"
})

// insert data into Transactions collection

db.Transactions.insertOne({
    _id : 1, 
    type : "purchase",
    Product_id :  1 
})

db.Transactions.insertOne({
    _id : 2, 
    type : "sale",
    Product_id :  2 
})

//  find all catergoies in the Categories Collection

db.Categories.find({})

// find all Suppliers in the Suppliers Collection

db.Suppliers.find({})

// find all Product in the Products Collection

db.Products.find({})

// find all Users in the Users Collection

db.Users.find({})

// find all Transactions in the Transactions Collection

db.Transactions.find({})

// update Product in Product Collection

db.Products.update({
    _id : 1
},{
    $set : {selling_price : "#3000"}
}
)

// update Users in Users Collection

db.Users.update({
    _id : 3
},{
    $set : {role : "admin"}
})

// delete Product in Product Collection

db.Products.deleteOne({
    _id : 4
})


// delete Users in Users Collection

db.Users.deleteOne({
    _id : 3
})

// get all Products based on Suppliers id

db.Products.aggregate([
    {$lookup : { 
        from: "Suppliers" , 
        localField: "Supplier_id", 
        foreignField : "_id", 
        as : "Supplier"
        }
    }
])

// get all Products based on Categories id

db.Products.aggregate([
    {$lookup : { 
        from: "Categories" , 
        localField: "Categories_id", 
        foreignField : "_id", 
        as : "Category"
        }
    }
])

// get all Transactions  based on Product id

db.Transactions.aggregate([
    {
        $lookup :{
            from: "Products" , 
            localField: "Product_id", 
            foreignField : "_id", 
            as : "Product"
        }
    }
])