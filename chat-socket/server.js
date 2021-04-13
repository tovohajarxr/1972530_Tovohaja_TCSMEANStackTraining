const app = require("express")();
const http = require("http").Server(app);  
const io = require("socket.io")(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection",(socket)=> {
    console.log(" - - - Client connection established - - - ");
    
    socket.on("chat",(data)=> {
        console.log(`${data.name}: ${data.msg}`);
    })
})
http.listen(9090,()=>console.log('server running on port number 9090'));