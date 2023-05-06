import express, { Request, Response } from 'express';

const PORT = 3000;
const app = require('express')();
const cors = require('cors');
const {MongoClient, ObjectId } = require('mongodb');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

var uri = "mongodb://mongo-advweb:USPCBgpAddVS0oFJlzskwkIios0ZnW7s75iXLeQMuZhTxlgPM0Tcwtv4NQFZs7VHl4LhbpgF3S2TACDbE53iNg==@mongo-advweb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mongo-advweb@"
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.delete('/buildings/:id', async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

  
    const client = new MongoClient(uri);
    
    console.log(req.params.id)
    const myObjectId = new ObjectId(req.params.id);

    try {
      await client.connect();

      const result = await client.db("ocu").collection("buildings").deleteOne({_id: myObjectId});
  
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    } finally {
      client.close();
    }
  });
  

app.get('/buildings', async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    const client = new MongoClient(uri);

    await client.connect();
    
    const result = await client.db("ocu").collection("buildings").find({}).toArray();
    console.log(result)
    client.close();

    res.send(result);
  });

  app.post('/buildings', async (req: Request, res: Response) => {
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    const client = new MongoClient(uri);
  
    console.log("hi");
    try {
      await client.connect();
      const collection = client.db("ocu").collection("buildings");
  
      const userData = {
        _id: req.body._id,
        id: req.body.id,
        name: req.body.name,
        lat: req.body.lat,
        long: req.body.long,
        code: req.body.code,
        decription: req.body.decription,
      };
  
      const result = await collection.insertOne(userData);
      console.log(result);
      res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'ERROR' });
    } finally {
        client.close();
    }
  });

  interface UpdateData {
    id?: number;
    name?: string;
    lat?: number;
    long?: number;
    code?: string;
    decription?: string;
  }

  app.put('/buildings/:id', async (req: Request, res: Response) => {
    const client = new MongoClient(uri);
    console.log(req.params.id)
    const myObjectId = new ObjectId(req.params.id);

    try {
      // const result = await client.db("ocu")
      // .collection("buildings")
      // .updateOne({_id: myObjectId}, 
      //   {$set: { name:"test"}});
      await client.connect();
      const collection = client.db("ocu").collection("buildings");
  
      const updateData: UpdateData = {};

      if (req.body.id != null) {
        updateData.id = req.body.id;
      }
      
      if (req.body.name != null) {
        updateData.name = req.body.name;
      }
  
      if (req.body.lat != null) {
        updateData.lat = req.body.lat;
      }
  
      if (req.body.long != null) {
        updateData.long = req.body.long;
      }
  
      if (req.body.code != null) {
        updateData.code = req.body.code;
      }
  
      if (req.body.decription != null) {
        updateData.decription = req.body.decription;
      }
  
      const result = await collection.updateOne({ _id: myObjectId }, { $set: updateData });
     
        console.log(result);
        res.json(result)
      } catch (error) {
        console.log(error);
      } finally {
        client.close();
      }
  });
