email = args[0]
if(user.login === true && ReadData.users[0][username] !== undefined){
  ReadData.users[0][username].email = email
  systemmessage(usersocket,`Your email, ${email} has been registered to your account!`)
}
