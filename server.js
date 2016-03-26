
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var app = express();
var path = require('path');
// Configuration
  //mailconfiguration
var nodemailer = require('nodemailer');
var config = require("./mailconfig.js");
var transport = require('nodemailer-smtp-transport');
var Transporter = nodemailer.createTransport(transport(config));
  //body
var bodyParser = require("body-parser");


app.configure(function(){
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.static(__dirname + '/public'));
  });

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

//send mail function
app.post('/sendmail',function(req,res,next){
  console.log("Recieved sendmail request");
  //console.log(req.body);
  var mail = {
    from : req.body.first_name + " " + req.body.last_name + " <" + req.body.email + ">" ,
    sender : req.body.email ,
    to : "rumun2k16@gmail.com" ,
    replyTo : req.body.email ,
    subject : "Query regarding RUMUN" ,
    text : req.body.message
  }
  console.log(mail);
  Transporter.sendMail(mail, function(error, info){
    if(error){
      console.log(error);
      res.send({err : true , msg : error})
    }else{
      console.log('Message sent: ' + info.response);
      res.send({err : false});
    }
  });
});
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port);
  //Verify that mailer is working properly
  Transporter.verify(function(error, success) {
     if (error) {
          console.log(error);
     } else {
          console.log('Mailer is ready to send messages');
     }
  });
});
