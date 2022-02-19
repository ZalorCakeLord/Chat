username = args[0]
password = args[1]
oldname = user.username
if(ReadData.users[0][username] === undefined){systemmessage(usersocket,'No account with that username exists!')}
if(ReadData.users[0][username].password !== password){systemmessage(usersocket,`Incorrect Password! Run %forgotpassword ${username} if you have forgotten it!`)}
if(ReadData.users[0][username].username !== username){systemmessage(usersocket,'ERROR USERMISMATCH CONTACT DEV')}
if(ReadData.users[0][username].password === password && ReadData.users[0][username] !== undefined){
user.username = ReadData.users[0][username].nickname
user.color = ReadData.users[0][username].color
user.login = true
user.loginuser = ReadData.users[0][username].username
console.log('Name Change Detected')
SOCKET_ADDY[user.username] = {socket: socketId, room: SOCKET_ADDY[oldname].room}
delete SOCKET_ADDY[oldname];
systemmessage(usersocket, `Hello again <words style="color:${user.color}";><b>${user.username}</b></words>!`)
SOCKET_LIST[usersocket].emit('name',{name:user.username,color:user.color})
nameslist[user.username] = 0
delete nameslist[oldname]
}
