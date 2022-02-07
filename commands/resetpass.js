if(ReadData.users[0][username].code === 'nil'){systemmessage(usersocket,'Please run %forgotpassword first!')}
else{
let incode = args[0]
let newpass = args[1]
if(incode === ReadData.users[0][username].code){
  ReadData.users[0][username].password = newpass
  systemmessage(usersocket,`Your password has successfully been changed! Your new password is ${newpass}`)
  ReadData.users[0][username].code = 'nil'
  usewrite()
}
}
