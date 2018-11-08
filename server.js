const http = require('http');
const url  = require('url');
const fs   = require('fs');
const port = 8080;
    	
// Server object
http.createServer(function(request, response) {  

	// Gets pathname of page requested by client
	var pathname = url.parse(request.url).pathname;
    console.log("\n");
    console.log("Request for " + pathname + " received.");

    // Remove first '/' char from pathname, to be used as relative pathname
    var truePath = pathname.slice(1);

    // Get type of file requested
    var requestType = truePath.slice(0, truePath.indexOf('/'));

    // index.html response
 	if (pathname == '/') {
		truePath = 'index.html';
 		contentType = 'text/html'
 		requestType = 'html';
 	}
 	// icon response
 	if (truePath == 'favicon.ico') {
 		contentType = '/image/x-icon'
 		truePath = 'img/favicon.ico'
 	}
 	// js response
 	if (requestType == 'js') {
 		contentType = 'application/javascript'
 	}
 	// image response
 	if (requestType == 'img') {
 		contentType = 'image/jpeg'
 	}

    console.log('truePath = ' + truePath);
    console.log('requestType = ' + requestType);

 	// Write http header
	response.writeHead(200, {'Content-Type': contentType});
	
	// Reads file and writes it into http response
	fs.readFile(truePath, function(err, file) {
		if(err) {
			throw err;
		}
		response.write(file);
	    response.end();
	});


} ).listen(port);

console.log("Listening on port " + port + "...")
