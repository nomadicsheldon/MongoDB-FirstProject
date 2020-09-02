// jshint esversion: 6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, {
  useUnifiedTopology: true
});

//👉 Use connect method to connect to server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

// calling insert into MongoDB
  // insertDocuments(db, function() {
  //   client.close();
  // });

// calling Find into MongoDB
  findDocuments(db, function() {
    client.close();
  });
});

//👉 insert into MongoDB
const insertDocuments = function(db, callback) {
  // get the fruits collection
  const collection = db.collection('fruits');
  collection.insertMany([{
      name: "Apple",
      score: 8,
      review: "Great Fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result) {
    // checks for no error
    assert.equal(err, null);
    // assuring that 3 result is added into db
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    //
    console.log("Inserted 3 fruits into the collection");
    callback(result);
  });
};


//👉 Find into MongoDB
const findDocuments = function(db, callback) {
  // get the fruits collection
  const collection = db.collection('fruits');
  // Find some find documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(fruits);
    callback(fruits);
  });
};
