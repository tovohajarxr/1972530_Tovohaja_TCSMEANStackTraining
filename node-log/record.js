const fs = require("fs")
const read = require('readline-sync');

exports.storeInput = storeInput;

function write(filename, data) {
  fs.writeFile(filename, data, {flag:"w"}, err => {
      if(!err){
          console.log("Data stored successfully...")
      }
  })
}

function getDateTime() {
  var timestamp = Date.now(); 
  var date = new Date(timestamp * 1000);
  var formattedDate = (
     '0' + date.getDate()).slice(-2) + '/' + 
    ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + 
    ('0' + date.getHours()).slice(-2) + ':' + 
    ('0' + date.getMinutes()).slice(-2);
  return formattedDate;
}

function getJsonArr(filename) {
  return (fs.readFileSync(filename) == "") ? 
    [] : JSON.parse(fs.readFileSync(filename))
}

function storeInput(n = 1, filename = "records.json") {
  let res = getJsonArr(filename)
  while(n--) {
    const obj = {
      firstName: read.question("First name: "),
      lastName: read.question("Last name: "),
      gender: read.question("Gender: "),
      email: read.question("Email: "),
      timestamp: getDateTime()
    }
    res.push(obj)
    console.log('\n')
  }
  write(filename, JSON.stringify(res, null, '\t'));
}
