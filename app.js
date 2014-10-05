var http = require('http');
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./javascript'));
app.use(express.static('./uploads'));
var upload_dir = './uploads';

var exists = fs.existsSync(upload_dir);
if (!exists) {
    fs.mkdirSync(upload_dir);
}

app.use(express.bodyParser({ keepExtensions: true, uploadDir: upload_dir }));

app.use(app.router);
app.get('/', routes.index);
app.post('/uploadFile', routes.uploadFile);

http.createServer(app).listen(3000, function() {
    console.log('Express app started');
});
