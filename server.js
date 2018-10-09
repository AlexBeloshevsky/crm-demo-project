var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
let {Client} = require('./models/clientModel');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/crmDB', function() {
  console.log("DB connection established!!!");
})

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.get('/insertClients',(req,res)=>{
 let data = require('./src/data.json');
 data.map ((client)=>{
   let clientItem = new Client (client)
   clientItem.save((err,data)=>{
     if (err) {
       console.log(err);
       res.send("Error: Cannot add client to DB")
     }
     console.log(clientItem);
   });
 });
 res.send('add all clients');
})

app.get('/clients', (req, res, err) => {
  let clients;
  if (err) {
    console.log(err);
  }
  Client.find().exec(function(err, clients){
    if (err){
      console.log(`couldn't return clients: ${err}`);
    }
    res.send(clients);
  });
});

app.post('/actions', (req, res, err) => {
  if (err) {
    console.log(err);
  }
  let newClient = new Client({
    name: req.body.name,
    email: "",
    firstContact: req.body.firstContact,
    emailType: "",
    sold: false,
    owner: req.body.owner,
    country: req.body.country
  });
  newClient.save((err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

app.post('/clients/:clientID', (req, res, err) => {
  if (err) {
    console.log(err);
  }
  Client.findOneAndUpdate({"_id":req.params.clientID}, {$set:{
    country:req.body.row.country,
    name: `${req.body.row.firstName} ${req.body.row.lastName}`
  }}, {new: true})
  .exec((err, client) => {
    if (err) {
      console.log(err);
      res.send('Err')
    }
    // client.name = `${req.params.row.firstName} ${req.params.row.lastName}`;
    // client.country ='india';
    res.send(client);
  })
})

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
