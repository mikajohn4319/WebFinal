import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// const app = require('express')();

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const MongoClient = require('mongodb').MongoClient;

// // Replace the connection string with your own
// const connection = "mongodb://mongo-advweb:USPCBgpAddVS0oFJlzskwkIios0ZnW7s75iXLeQMuZhTxlgPM0Tcwtv4NQFZs7VHl4LhbpgF3S2TACDbE53iNg==@mongo-advweb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@mongo-advweb@";

// // Create a new MongoClient
// const client = new MongoClient(connection);

// // Connect to the MongoDB database
// client.connect(function(err, db) {
//   if (err) {
//     console.log('Unable to connect to the MongoDB server:', err);
//   } else {
//     console.log('Successfully connected to the MongoDB server');
//     db.close();
//   }
// });

ReactDOM.render(<App />, document.getElementById('root'));
