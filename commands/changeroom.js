//rooms are gonna suck ass lol
//idk how I'mma do this, gonna have to change the basic message logic.
//I fuckin did it

  var room = args[0]
  SOCKET_ADDY[user.username].room = args[0]
  user.room = args[0]
  if(args[0] === overwatchroom){
    systemmessage(usersocket,`Welcome to the Overwatch room, ${user.username}`)
    SOCKET_LIST[usersocket].emit('changeroom','<h3 style="display:inline"class="glowUnaligned">Overwatch</h3>')
  }else{
  systemmessage(usersocket,`Your room has been changed to ${args[0]}`)
  SOCKET_LIST[usersocket].emit('changeroom',room)}
