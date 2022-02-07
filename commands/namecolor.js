user.color = args[0]
if(user.login === true){
  ReadData.users[0][username].color = user.color
}
systemmessage(usersocket,`Your name is now <words style="color:${user.color}";><b>${user.color}</b></words>`)
let edited_ReadData = JSON.stringify(ReadData);
fs.writeFileSync("./users.json", edited_ReadData);
SOCKET_LIST[usersocket].emit('name',{name:user.username,color:user.color})
