const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'mydb';

// 连接到mongodb
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // 定义路由，接收参数并存入mongodb
  app.get('/users', function(req, res) {
    const user = { name: req.query.name, email: req.query.email };
    db.collection('users').insertOne(user, function(err, result) {
      if (err) throw err;
      console.log("1 document inserted");
      res.send('User added to database');
    });
  });

  // 启动服务
  app.listen(port, () => console.log(`Server listening on port ${port}!`));
});