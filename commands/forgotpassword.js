username = args[0]
if(ReadData.users[0][username] === undefined){systemmessage(usersocket, 'No account exists with that username!')}
if(ReadData.users[0][username].email === 'none'){systemmessage(usersocket, 'No email is registered to this account! Please contact <b>Lord Bobby#3011</b> on discord, or email him at pararesegroup@gmail.com to retrieve or reset your account.')}
if(ReadData.users[0][username].email !== 'none' && ReadData.users[0][username] !== undefined){
  systemmessage(usersocket,`A randomly generated code is being sent to your registered email address, ${ReadData.users[0][username].email}`)
  systemmessage(usersocket,'When you receive it, run %passreset [code] [newpassword]')
  systemmessage(usersocket,'If you no longer have access to the registered email address, contact <b>Lord Bobby#3011</b> on discord, or email him at pararesegroup@gmail.com to discuss options.')
  var code = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
  ReadData.users[0][username].code = code
  email_send(`Your password reset code is: ${code}
     Run %resetpass ${code} {your new password} to regain access to your account!`,ReadData.users[0][username].email,'ZalorChat Password Reset Code')
}
