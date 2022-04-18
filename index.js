
//Thus begins my greatest toil... fixing my my own code

//this bit here is basically a catch all, preventing any error from crashing the program
//I imagine this is not best practice
//I'll fix it later
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  //consoleroom('Caught exception(bit of a bruh moment hm?): ' + err)
});

//dependencies and setup
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



//functions used inside the main code. this is gonna suck.

//can definitely change this
//userlist:
/*
        let user = {
          username: socketId, //initially starts as the randomly generated socketId
          loginuser:'',//for if the user is logged in, idr what it actually does :(
          socket: socketId,//randomly generated on connection
          color: '#FF0000', 
          room: 'GENERAL',
          login: false,
          send(msg){
            console.log('test')
            //leaving this here as a good idea
          }
        }
        userList.push(user)    this is for me to look at, should delete it after

*/
function getusernamefromsocket(id){
  for(let i = 0;i<userList.length;i++){//lots of nice for(i in whatever) here, not bothering though
    let {username,socket} = userList[i]
    if(socket === id) return username
  }
}

function log(msg,extmsg){
  if(debugmode === true){console.log(extmsg)}
  else{console.log(msg)}
}

function removeA(arr) {//this was definitely NOT my code lmao.
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


//commenting out all consoleroom code, it doesn't even work half the time.
// function consoleroom(msg){
//   for(var i in SOCKET_LIST){
//   if(SOCKET_ADDY[getusernamefromsocket(i)] === undefined){
//     console.log('error, no user with socket.')}else{
//   if(SOCKET_ADDY[getusernamefromsocket(i)].room === 'CONSOLE'){

//   SOCKET_LIST[i].emit('addToChat', `<name style="color:#FF0000";><b>SYSTEM</b>:</name><par>${msg}</par>`)

// }}
// }
// }






//rewriting user database. not touchin this yet.
function usewrite(){
  let edited_ReadData = JSON.stringify(ReadData);
  fs.writeFileSync("./users.json", edited_ReadData);
}


//THE NITTYGRITTY! from here on we jump into the proper server bits
app.get('/',function(req, res) {
 res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

console.log("ZALORCHAT VER 2.0.0")
console.log("Server started.");
SOCKET_ADDY = []
//lots of extraneous code, need to fix that. I think most of these lists are the same hting but in
//a different way.
ANOTHER_FUCKING_LIST = []
nameslist = {}
ROOMS = []
//adding another list makes me wanna throw up, but I think it's a good idea. should let me
//get rid of all the others if it works like I'm thinking.
let userList = []

let pop=0 //holds total population of server. defined outside sockets in order to cover all of them.

//randomly generates a room which will receive every message.
//var overwatchroom = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
//console.log(`Overwatch room is ${overwatchroom}`)


//fuck it, nuclear option.
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket){
       pop+=1
        var socketId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        var username = socketId
        systemannounce("A new user has connected!")
        for(var i in SOCKET_LIST){
        SOCKET_LIST[i].emit('pop', pop)

        }

        //very important, the user object!
        let user = {
          username: socketId, //initially starts as the randomly generated socketId
          loginuser:'',//for if the user is logged in, idr what it actually does :(
          socket: socketId,//randomly generated on connection
          color: '#FF0000', 
          room: 'GENERAL',
          login: false,
          send(msg){
            console.log('test')
            //leaving this here as a good idea
          }
        }
        userList.push(user)

        //heres some more gore
        nameslist[user.username] = 0
        SOCKET_ADDY[username] = {socket: socketId, room: 'GENERAL'}
        SOCKET_LIST[socketId] = socket;
        ANOTHER_FUCKING_LIST.push(user)
        //this is already filling me with despair, gonna jump to rewriting the functions


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
            let clas = ''
            let clas2 = ''
            if(data.split(' ').includes('#neon')){
              data = data.replace(/#neon/,'')
              clas = 'class="neon"'
            }
            if(user.login === true && user.loginuser === "Bortan"){
              console.log('THE LORD SPEAKETH')
              clas2 = "class='glowUnaligned'"
            }
            log(user.username+' sent a message!',`${user.username} successfully sent:${data}`)
            for(var i in SOCKET_LIST){
            if(SOCKET_ADDY[getusernamefromsocket(i)] === undefined){
              console.log('error, no user with socket.')}else{
            if(SOCKET_ADDY[getusernamefromsocket(i)].room === user.room/* || SOCKET_ADDY[getusernamefromsocket(i)].room === overwatchroom*/){
            switch (user.login) {
              case true:
                prefixa = '✅'
                break;
              case false:
                prefixa = ""
                break;
              default:

            }


              SOCKET_LIST[i].emit('addToChat', `<name ${clas2}style="color:${user.color}";><b><small>${prefixa}(${user.room})  </small>${user.username}</b>:</name><par ${clas}>${data}</par>`);


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
