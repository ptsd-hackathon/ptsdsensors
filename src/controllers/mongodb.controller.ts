
import { MongoClient, Db } from 'mongodb';
import * as assert from 'assert';
import { Observable, of } from 'rxjs';

import { IPersonStatistics } from '@models/statistics.model';
//JSON.stringify(object)
const defaultJson: IPersonStatistics = {
    count: 0,
    lastSampleAt: new Date(),
    calories: { min: 0, max: 10, average: 5, lastSample: 7 },
    respiratoryRate: { min: 0, max: 10, average: 5, lastSample: 7 },
    spO2: { min: 0, max: 10, average: 5, lastSample: 7 },
    heartRate: { min: 0, max: 10, average: 5, lastSample: 7 },
    hrVariability: { min: 0, max: 10, average: 5, lastSample: 7 },
    systolicBP: { min: 0, max: 10, average: 5, lastSample: 7 },
    diastolicBP: { min: 0, max: 10, average: 5, lastSample: 7 },
    pulsePressure: { min: 0, max: 10, average: 5, lastSample: 7 },
    strokeVolume: { min: 0, max: 10, average: 5, lastSample: 7 },
    cardiacOutput: { min: 0, max: 10, average: 5, lastSample: 7 },
    cardiacIndex: { min: 0, max: 10, average: 5, lastSample: 7 },
    svrTemperature: { min: 0, max: 10, average: 5, lastSample: 7 },
    sweat: { min: 0, max: 10, average: 5, lastSample: 7 }
}

export function createNewUser(newUserId: String) {
     const url = 'mongodb://localhost:27017';
     const dbName = 'myproject';

     MongoClient.connect(url, function(err, client) {
     
     const db: Db = client.db(dbName);
     const collection = db.collection('documents');
     const myuser = {...defaultJson, userId: newUserId};
     // Insert some documents
     collection.insertMany([
        myuser
     ]);
 
  
     client.close();
     });
 
}


export function initDB() {
}
export function updatePersonAvg(per: IPersonStatistics) {
}

export function getProfileStatistics(): Observable<IPersonStatistics> {
    
    return of(defaultJson);
}


const runFunctionOnDb = function(operation: (db: Db, f) => any) {
 
    // Connection URL
    const url = 'mongodb://localhost:27017';
    
    // Database Name
    const dbName = 'myproject';
    
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    
    const db: Db = client.db(dbName);
    operation(db, () => {} );
    client.close();
    //insertDocuments(db, () => {}  );

    //updateDocument(db, () =>  {});
    //removeDocument(db, () => {});
            //.close();
    
    //findDocuments(db, function() {
        //});
    });

}

const insertDocuments = function(db: Db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    defaultJson.userId
    collection.insertMany([
        defaultJson
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });

  }

  const findDocuments = function(db: Db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({'a': 2}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

  const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });
  }

  const updateDocument = function(db: Db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
      , { $set: { b : 1 } }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });
  }