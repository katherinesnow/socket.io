var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http); // socket.io 服务器端用于集成(或挂载)到Node.js HTTP服务器 socket.io
// 一个加载到浏览器中客户端，socket.io-client
// 开发环境中，socket.io 会自动提供客户端.

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket) {
    console.log('a user connected.')
    socket.on('chat message', function (msg) {
        // 为了简单起见，我们将消息发送给所有用户，包括发送者
        console.log('message：' + msg)
        io.emit('chat message', msg)
    })

    socket.on('disconnect', function() {
        console.log('user disconnected')
    })
})

http.listen(3000, function(){
    console.log('listening on *:3000');
});