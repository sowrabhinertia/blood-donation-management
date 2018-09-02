var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var alert =require('alert-node');
const err = new Error('The error has occured');
app.use(bodyParser.urlencoded({ extended: true }));
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
var con = mysql.createConnection({
  host: "localhost",
  user: "sowrabhinertia",
  password: "starullal",
  database: "logsam"
});
con.connect(function(err) {
  if (err){
    console.error(err.message);
    return;
  }
  console.log("database connected")
  var sql = "INSERT INTO blood2 (name, email,city,pincode,blood_group,address,phone) VALUES ('"+req.body.name+"', '"+req.body.email+"','"+req.body.city+"','"+req.body.pincode+"','"+req.body.blood_group+"','"+req.body.address+"','"+req.body.phone+"')";
  con.query(sql, function (err, result) {
    if (err){
      console.error(err.message);
      return;
    }
    console.log("record inserted into database");
    alert("Your data has been registered sucessfully");
     con.end();
     console.log("connection removed");
  });
  });
  res.redirect('/donate.html');
});
app.post('/donors',function(req,res){
  console.log("hello");
  var con = mysql.createConnection({
    host: "localhost",
    user: "sowrabhinertia",
    password: "starullal",
    database: "logsam"
  });
  con.connect(function(err) {
  if (err){
    console.error(err.message);
    return;
  }
  console.log("database accessible");
  con.query("SELECT* FROM blood2 WHERE blood_group= ('"+req.body.blood_group+"') AND city=('"+req.body.city+"') ", function (err, result, fields) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(result);
    if(result.length > 0){
    res.write("<table>");
        res.write("<tr>");
        for(var column in result[0]){
            res.write("<td><b><center><label>"+ column + "</label></b></br></center></td>");
        }
        res.write("</tr>");
        for(var row in result){
            res.write("<tr>");
            res.write("</br>");
            for(var column in result[row]){
                res.write("<td><label></br>" + result[row][column] + "</label></td>");
            }
            res.write("</tr>");
            res.write("</br>");
        }
        res.write("</table>");
        con.end();
        console.log("connection removed"); }
        else{
          console.log("requested blood group not found");
          res.send("<center><b>Requested Blood Group Not Found</b></center>");
        }

  });
});
});
app.listen(3000);
console.log('server running on port 3000');
