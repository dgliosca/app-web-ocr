// Include the Node HTTP library
var http = require('http');
var fs = require('fs');
var tesseract = require('node-tesseract');
// Include the Express module
var express = require('express');
// Create an instance of Express
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


var routes = require('./routes');
// Add router middleware explicitly
app.use(app.router);
// Routes
app.get('/', routes.index);
app.post('/uploadFile', routes.uploadFile);

// Pass the Express instance to the routes module
var routes = require('./routes');



// Start the app
http.createServer(app).listen(3000, function() {
 console.log('Express app started');
});
