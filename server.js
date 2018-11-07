const http = require('http');
const url  = require('url');
const fs   = require('fs');
const port = 8080;
    	
// Server object
http.createServer( function(request, response) {  

	// Gets pathname of page requested by client
	var pathname = url.parse(request.url).pathname;
    console.log("\n");
    console.log("Request for " + pathname + " received.");

    // string that indicates the sub directory of the file requested
    // (NOTE: this string has 4 charactes. subdirectories have either 2 or 3 characters.
    //  thus, for 2 character directories, the string ends with a '\' and for 3 character
    //  directories, it does not)
    var pathnameDir = pathname.slice(0,4);
    console.log("pathnameDir = " + pathnameDir);

    // string used to get the file requested (pathname without first '/')
    var getFilePath = pathname.slice(1);
    console.log("getFilePath = " + getFilePath);

    // index.html response
 	if (pathname == "/") {
		getFilePath = "index.html";
 		contentType = 'text/html'
 	}
 	// icon response
 	if (pathname == "/favicon.ico") {
 		contentType = '/image/x-icon'
 		getFilePath = 'img/favicon.ico'
 	}
 	// js response (getFilePath is already corect)
 	if (pathnameDir == "/js/") {
 		contentType = 'application/javascript'
 	}
 	// image response (getFilePath is already corect)
 	if (pathnameDir == "/img") {
 		contentType = 'image/jpeg'
 	}

 	// Write http header
	response.writeHead(200, {'Content-Type': contentType});
	
	// Reads file and writes it into http response
	fs.readFile(getFilePath, function(err, file) {
		if(err) {
			throw err;
		}
		response.write(file);
	    response.end();
	});


} ).listen(port);

console.log("Listening on port " + port + "...")
