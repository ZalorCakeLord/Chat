let id = args[0]
var lol = Object.entries(SOCKET_ADDY).find(([username, socket]) => username === id)?.[0]
console.log(lol)

systemmessage(usersocket,`${lol}`)
