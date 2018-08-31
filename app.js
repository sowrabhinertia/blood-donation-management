var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var alert =require('alert-node');
app.use(bodyParser.urlencoded({ extended: true }));
var con = mysql.createConnection({
  host: "localhost",
  user: "sowrabhinertia",
  password: "starullal",
  database: "logsam"
});
app.get('/',function(req,res,next){
res.sendfile('index.html');
});
app.get('/donate.html',function(req,res,next){
res.sendfile('donate.html');
});
app.get('/donors.html',function(req,res,next){
res.sendfile('donors.html');
});

app.post('/donate', function(req, res) {
console.log('req.body');
console.log(req.body);
console.log("inserting into database");
con.connect(function(err) {
  if (err) throw err;
  console.log("database connected")
  var sql = "INSERT INTO blood2 (name, email,city,pincode,blood_group,address,phone) VALUES ('"+req.body.name+"', '"+req.body.email+"','"+req.body.city+"','"+req.body.pincode+"','"+req.body.blood_group+"','"+req.body.address+"','"+req.body.phone+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted into database");
    alert("Your data has been registered sucessfully");
     res.end();
  });
  });
  res.redirect('/donate.html');
});
app.listen(3030);
console.log('server running on port 3030 ');
