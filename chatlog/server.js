const app = require("express")();
const http = require("http").Server(app);  
const io = require("socket.io")(http);
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/meanstack';

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(url, options);

let db = mongoose.connection;
db.on("error",(err)=>console.log(err));

app.get("/",(req,res)=> {
    res.sendFile(__dirname + "/index.html");
})

db.once('open', () => {
  const ChatSchema = mongoose.Schema({
    name: String,
    message: String,
    timestamp: Number
  })

  let Chat = mongoose.model('', ChatSchema, 'Chat');

  io.on("connection",(socket)=> {
    console.log(" - - - Client connection established - - - ");
    
    socket.on("chat",(data)=> {
      let chat = new Chat({
        name: data.name,
        message: data.msg,
        timestamp: Date.now()
      });
      console.log(chat); 
      mongoose.connect(url, options);
      chat.save( (err,res) => {
        (!err)? console.log(`( saved )`) : console.log(err)
        mongoose.disconnect();
      });
    });
  });
});



const port = 9090;
http.listen(port,()=>console.log(`server running on port number ${port}`));