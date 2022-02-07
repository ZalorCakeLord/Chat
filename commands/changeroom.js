//rooms are gonna suck ass lol
//idk how I'mma do this, gonna have to change the basic message logic.
//I fuckin did it
  var room = args[0]
  SOCKET_ADDY[user.username].room = args[0]
  user.room = args[0]
  systemmessage(usersocket,`Your room has been changed to ${args[0]}`)
  SOCKET_LIST[usersocket].emit('changeroom',room)
