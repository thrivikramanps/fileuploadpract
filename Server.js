var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');    //File System-needed for renaming file etc

var app = express();
app.use(express.static(path.join(__dirname, 'public')));


var BUCKET_NAME = 'doctornow-webapp';

var fs = require('fs');

var aws = require('aws-sdk');
aws.config.loadFromPath('./AwsConfig.json');

var s3 = new aws.S3();

/* ========================================================== 
 bodyParser() required to allow Express to see the uploaded files
============================================================ */

app.get('/',function(req,res){
      res.sendfile("/public/index.html");
});

app.use(bodyParser({defer: true}));
 app.route('/upload')
 .post(function (req, res, next) {
  //console.log(" file path is " + req.files.file.path);
  var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./img";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    var files = [];
    var fields = [];

    form
      .on('field', function (field, value) {
   //     console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function (field, file) {
        console.log(file);
        files.push([field, file]);
      });

    for (var i=0; i<files.length; i++){
   //   console.log(files[0].field);
   //   console.log(files[0].file);
    }

    form.parse(req);

    /*form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        console.log("form.bytesReceived");
        //console.log("number of files is " + files.length);
        //TESTING
        console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        fs.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
        if (err)
            throw err;
          console.log('renamed complete');  
        });
          res.end();
    });*/
});
var server = app.listen(3030, function() {
console.log('Listening on port %d', server.address().port);
});

