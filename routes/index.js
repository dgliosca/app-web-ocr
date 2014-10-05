var fs = require('fs');
var tesseract = require('node-tesseract');

exports.index = function(req, res){
    res.render('index');
};

exports.uploadFile = function(req, res, next) {

	var uploadedFile = req.files.uploadedFile;
	var tmp_path = uploadedFile.path;
	var target_path =  'uploads/'+ uploadedFile.name;

	fs.rename(tmp_path, target_path, function(err) {
		if (err) { next(err); }
		fs.unlink(tmp_path, function() {
			if (err) { 
				next(err); 
			}
			console.log('File uploaded to: ' + target_path + ' - ' + uploadedFile.size + ' bytes');

			tesseract.process(target_path, function(err, text) {
			    if (err) {
			        res.json({ "error" : "It was not possible to elaborate the image"});
			    } else {
					res.json({ "text" : text});
				}
			});
		});
	});
};

