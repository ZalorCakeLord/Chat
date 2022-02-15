var oldname = user.username
var newname = args.join(' ')
if(nameslist[newname] === undefined){

user.username = newname
console.log('Name Change Detected')
SOCKET_ADDY[user.username] = {socket: socketId, room: SOCKET_ADDY[oldname].room}
delete SOCKET_ADDY[oldname];
systemmessage(usersocket,`Your name has been changed to ${user.username}`)
nameslist[user.username] = 0
delete nameslist[oldname]
SOCKET_LIST[usersocket].emit('name',{name:user.username,color:user.color})
for(let i=0;i<ANOTHER_FUCKING_LIST.length;i++){
  if(ANOTHER_FUCKING_LIST[i].socket===user.socket){ANOTHER_FUCKING_LIST.splice(i, 1, user);}
}
if(user.login === true){
  ReadData.users[0][username].nickname = user.username
  let edited_ReadData = JSON.stringify(ReadData);
  fs.writeFileSync("./users.json", edited_ReadData);

}
}else{
  systemmessage(usersocket,'That name is already in use! Try another!')
}
