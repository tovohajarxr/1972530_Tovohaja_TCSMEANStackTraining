const mongoose = require('mongoose');
const fs = require('fs');
const url = 'mongodb://localhost:27017/meanstack'; 

mongoose.Promise = global.Promise;

const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(url, options) 
const db = mongoose.connection;

db.on('error', err => { console.log(`Something's wrong -> ${err}`) });

db.once('open', () => { 
  const callSchema = mongoose.Schema({
    number: String,
    type: String,
    location: String,
    duration: String,
    charge: String
  });

  // creating model using schema
  const Call = mongoose.model('', callSchema, 'Call');

  let callData = JSON.parse(
    fs.readFileSync("call_data.json")
  );

  Call.insertMany(callData)
  .then( () => { mongoose.disconnect(); console.log("Data inserted") } )  
  .catch( e => console.log(e) )
})