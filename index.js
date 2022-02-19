process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  consoleroom('Caught exception: ' + err)
});
const fs = require('fs');
var express = require('express');
var app = express();
const fetch = require('node-fetch');
let prefixa = ''
let commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var server = require('http').createServer(app);
const ReadDatabase = fs.readFileSync('./users.json'); //reads the file in synchronized way
const ReadData = JSON.parse(ReadDatabase);
let SOCKET_LIST = {};
debugmode = false
function getusernamefromsocket(id){
  let lol = ''
  for(let i=0;i<ANOTHER_FUCKING_LIST.length;i++){
    if(ANOTHER_FUCKING_LIST[i].socket===id){lol = ANOTHER_FUCKING_LIST[i].username}
  }
  return lol
}
function log(msg,extmsg){
  if(debugmode === true){console.log(extmsg)}
  else{console.log(msg)}
}
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
function systemmessage(usr,msg){
  SOCKET_LIST[usr].emit('addToChat', `<name style="color:#FF0000";><b>SYSTEM</b>:</name><par>${msg}</par>`)
}
function systemannounce(msg){
  for(var i in SOCKET_LIST){
  SOCKET_LIST[i].emit('addToChat', `<name style="color:#FF0000";><b>SYSTEM</b>:</name><par>${msg}</par>`)

  }
}
function consoleroom(msg){
  for(var i in SOCKET_LIST){
  if(SOCKET_ADDY[getusernamefromsocket(i)] === undefined){
    console.log('error, no user with socket.')}else{
  if(SOCKET_ADDY[getusernamefromsocket(i)].room === 'CONSOLE'){

  SOCKET_LIST[i].emit('addToChat', `<name style="color:#FF0000";><b>SYSTEM</b>:</name><par>${msg}</par>`)

}}
}
}
const { gmailuser, gmailpass, MYNUMBER } = require('./config.json');
function email_send(msg,to,subj){
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailuser,
      pass: gmailpass
    }
  });

  var mailOptions = {
    from: 'ZalorChat System Message',
    to: `${to}`,
    subject: `${subj}`,
    text: `${msg}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
function usewrite(){
  let edited_ReadData = JSON.stringify(ReadData);
  fs.writeFileSync("./users.json", edited_ReadData);
}

app.get('/',function(req, res) {
 res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

console.log("ZALORCHAT VER 2.0.0")
console.log("Server started.");
SOCKET_ADDY = []

ANOTHER_FUCKING_LIST = []
nameslist = {}
ROOMS = []
let pop=0
var overwatchroom = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
console.log(`Overwatch room is ${overwatchroom}`)
//` have to add this to keep atom from making everything from this point down a fucking string
//email_send(`ZALORCHAT ACTIVE! Overwatch room: ${overwatchroom}`,'pararesegroup@gmail.com','ZalorChat Online')
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket){
       pop+=1
        var socketId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        var username = socketId
        systemannounce("A new user has connected!")
        for(var i in SOCKET_LIST){
        SOCKET_LIST[i].emit('pop', pop)

        }
        var user = {
          username: socketId,
          loginuser:'',
          socket: socketId,
          color: '#FF0000',
          room: 'GENERAL',
          login: false
        }

        nameslist[user.username] = 0
        SOCKET_ADDY[username] = {socket: socketId, room: 'GENERAL'}
        SOCKET_LIST[socketId] = socket;
        ANOTHER_FUCKING_LIST.push(user)


        var usersocket = SOCKET_ADDY[user.username].socket
        log('new user!',`${user.socket} has connected`);
        SOCKET_LIST[usersocket].emit('name',{name:user.username,color:user.color})
        SOCKET_LIST[usersocket].emit('changeroom',user.room)
        socket.on('popReq',function(data){
          socket.emit('pop',pop)
        })
        socket.on('sendMsgToServer',function(data){
          log(' ',`${user.username} attempted to send:${data}`)
          let orgmsg = data

          var prefix = '%'
          var data = data.replace(/<.*>/, ' ')
          var data = data.replace(/censored/g, '[CENSORED]')

          var args = data.split(' ')
          var cmd = args[0].replace(/%/, '')
          args.shift()

          log(' ',commands)


          if(orgmsg[0] === prefix){
            if(commands.includes(`${cmd}.js`) === true){
              return eval(`${fs.readFileSync(`./commands/${cmd}.js`).toString()}`)
            }
          }
          if(data!==undefined && isNaN(data) === true){
            eval(`${fs.readFileSync(`./emojis.js`).toString()}`)
          }


            if(data.length > 145){return SOCKET_LIST[usersocket].emit('addToChat', `<name style="color:${user.color}";><b>SYSTEM</b>:</name><par>Messages may not exceed 145 characters!</par>`);
            console.log(`${user.username} attempted to send a message longer than 145 characters.`)}
            log(user.username+' sent a message!',`${user.username} successfully sent:${data}`)
            for(var i in SOCKET_LIST){
            if(SOCKET_ADDY[getusernamefromsocket(i)] === undefined){
              console.log('error, no user with socket.')}else{
            if(SOCKET_ADDY[getusernamefromsocket(i)].room === user.room || SOCKET_ADDY[getusernamefromsocket(i)].room === overwatchroom){
            switch (user.login) {
              case true:
                prefixa = '✅'
                break;
              case false:
                prefixa = ""
                break;
              default:

            }
            let clas = ''
            if(data.split(' ').includes('#neon')){
              data = data.replace(/#neon/,'')
              clas = 'class="neon"'
              console.log('neon')
            }
              SOCKET_LIST[i].emit('addToChat', `<name style="color:${user.color}";><b><small>${prefixa}(${user.room})  </small>${user.username}</b>:</name><par ${clas}>${data}</par>`);


          }}
          }

        });

        socket.on('disconnect',function(){
            systemannounce(`${user.username} has disconnected.`)
            pop-=1
            log(`${user.username} has disconnected`,`${user.username},${user.socket} disconnected`)
            for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('pop', pop)

            }
            delete SOCKET_LIST[socket.id];
            delete nameslist[user.username]
            usewrite()

 });

});

server.listen(4141);
