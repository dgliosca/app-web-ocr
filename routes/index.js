var fs = require('fs');
var tesseract = require('node-tesseract');

exports.index = function(req, res){
 res.render('index');
};

// A route for the home page
exports.uploadFile = function(req, res, next) {

	 // Reference to the profile_image object
	var uploadedFile = req.files.uploadedFile;
	 // Temporary location of the uploaded file
	var tmp_path = uploadedFile.path;
	 // New location of the file
	var target_path =  'uploads/'+ uploadedFile.name;
	 // Move the file from the new location
	 // fs.rename() will create the necessary directory
	fs.rename(tmp_path, target_path, function(err) {
	 // If an error is encountered, pass it to the next handler
		if (err) { next(err); }
	 	// Delete the temporary file
		fs.unlink(tmp_path, function() {
			// If an error is encountered, pass it to the next handler
			if (err) { 
				next(err); 
			}
			console.log('File uploaded to: ' + target_path + ' - ' + uploadedFile.size + ' bytes');
			console.log('File properties ' + req.files.path);
			var returnValue;
			
				// Recognize text of any language in any format
			tesseract.process(target_path, function(err, text) {
			    if (err) {
			        console.error(err);
			    } else {	
					res.json({ "result" : text});
				}
			});
				
		});
	});
};

