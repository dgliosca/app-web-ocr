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
	    // If an error is encountered, pass it to the next handler
		if (err) { next(err); }
	 	// Delete the temporary file
		fs.unlink(tmp_path, function() {
			if (err) { 
				next(err); 
			}
			console.log('File uploaded to: ' + target_path + ' - ' + uploadedFile.size + ' bytes');
			// Recognize text of any language in any format
			tesseract.process(target_path, function(err, text) {
			    if (err) {
			        console.error(err);
			    } else {	
					res.json({ "text" : text});
				}
			});
		});
	});
};

