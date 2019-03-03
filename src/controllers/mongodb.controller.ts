
import { MongoClient, Db } from 'mongodb';
import * as assert from 'assert';
import { Observable, of } from 'rxjs';

import { IPersonStatistics } from '@models/statistics.model';
import { IWatchStatisticsSample } from '@models/watch.model';
//JSON.stringify(object)
const defaultJson: IPersonStatistics = {
    userId: "",
    count: 1,
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


const defaultWatch: IWatchStatisticsSample = {
    date: new Date(),
    calories:  9 ,
    respiratoryRate:  9 ,
    spO2:  9 ,
    heartRate:  9 ,
    hrVariability:  9 ,
    systolicBP:  9 ,
    diastolicBP:   9 ,
    pulsePressure:  9 ,
    strokeVolume:  9 ,
    cardiacOutput:  9,
    cardiacIndex:  9,
    svrTemperature:  9 ,
    sweat:   9 
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
     ],(err,result)=>{
         console.log('inserted: ',result);
         client.close();

     });
 
  
     });
 
}


export function initDB() {
}
export function updatePersonAvg(watchSample: IWatchStatisticsSample, userId: String) {
    const url = 'mongodb://localhost:27017';
     const dbName = 'myproject';

     MongoClient.connect(url, function(err, client) {
     
        const db: Db = client.db(dbName);
        const collection = db.collection('documents');
        
        // Find some documents
        collection.find({'userId': userId}).toArray((err, docs: IPersonStatistics[]) => {
            const statDocument: IPersonStatistics = docs[0];
            const newDoc = {...statDocument};

            const toOmit = ['userId', 'count', 'lastSampleAt'];
            Object.keys(statDocument).filter(prop => toOmit.indexOf(prop) === -1).forEach(prop => {
                newDoc[prop].average = (statDocument.count*statDocument[prop].average+watchSample[prop]) / (statDocument.count+1);
                newDoc[prop].max = Math.max(statDocument[prop].max, watchSample[prop]);
                newDoc[prop].min = Math.min(statDocument[prop].min, watchSample[prop]);
                newDoc[prop].lastSample = watchSample[prop];
            });
            newDoc.count = statDocument.count+1;
            newDoc.lastSampleAt = watchSample.date;
            console.log(newDoc);
            collection.updateOne({'userId': userId}, { $set: newDoc } 
            , (err, result) => {
                console.log('err', err);
                console.log('result', result);
                console.log("Updated the document with the field a equal to "+userId);
                client.close();
              }); 
            

        });
    });

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