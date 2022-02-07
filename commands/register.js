username = args[0]
password = args[1]
nickname = args[2]
color = args[3]
if(username === undefined||password === undefined||nickname === undefined||color === undefined){systemmessage(usersocket,'Missing arg! username password nickname color!')}
else if(ReadData.users[0][username] === undefined){
ReadData.users[0][username]= {username: username, password: password, nickname: nickname,
color: color, email: 'none', code: 'nil'}
usewrite()
systemmessage(usersocket,'Account Created! Run %login username password to log in!')
}
else if(ReadData.users[0][username] !== undefined){
  systemmessage(usersocket,'An account with this username already exists! If this is your account please login! If not, try a different username!')
}
