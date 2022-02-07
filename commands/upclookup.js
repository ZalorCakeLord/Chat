async function upclookup(){
  var barcode = args[0]
  if(barcode === undefined){return systemannounce('You have to include a barcode to look up!')}
  const read = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`).then(response => response.json()).catch(error => {return message.channel.send(`There was a problem! Are you sure your upc code was entered correctly? If so, I'm afraid I can't find it. I'm sorry ${message.author} `)})
    if (read.items === undefined){systemmessage(usersocket,"`:(`")}
    else{

    if (read.items[0].offers != undefined){
    var price = read.items[0].offers[0].price}
    if (price === null){var readprice = "`price not found`"}


    else {var readprice = price}
    systemmessage(usersocket,`Barcode ${barcode} refers to ${read.items[0].title} Image:<p><a href="${read.items[0].images[0]}">Click Here</a></p>`)
   }
  }
  upclookup()
