var target = args[0]
args.shift()
var mesg = args.join(' ')
data = mesg
if(SOCKET_LIST[SOCKET_ADDY[target].socket] === undefined){
  SOCKET_LIST[usersocket].emit('addToChat', `<name style="color:${user.color}";><b>SYSTEM</b>:</name><par>This is not a valid user!</par>`);
}else{
  if(data!==undefined && isNaN(data) === true){
    eval(`${fs.readFileSync(`./emojis.js`).toString()}`)
  }
  mesg = data
  switch (user.login) {
                case true:
                  prefixa = '✅'
                  break;
                case false:
                  prefixa = ""
                  break;
                default:

              }
SOCKET_LIST[SOCKET_ADDY[target].socket].emit('addToChat', `<small><name style="color:${user.color}";><b>${prefixa}(DM) ${user.username}</b>:</name><par>${mesg}</par></small>`);
SOCKET_LIST[usersocket].emit('addToChat', `<small><name style="color:${user.color}";><b>${prefixa}(DM) ${user.username}</b>:</name><par>${mesg}</par></small>`)}
