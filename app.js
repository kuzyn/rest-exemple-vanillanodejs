var http = require('http');

var server = http.createServer(function(req, res) {

  var headers = { 'Content-Type': 'text/html'};

  if (req.url === '/' && (req.method === 'GET' || req.method === 'POST')) {
    // handle our only route

    if (req.method === 'POST') {
      // console.log('POST');
      var postVarValue = '';

      req.on('data', function(chunk) {
        // listen for data & buffer it
        postVarValue += chunk.toString();
      });

      req.on('end', function() {
        // process the data once the transfert is done
        postVarValue = /postVar=(.+)/.test(postVarValue) && postVarValue.match(/postVar=(.+)/)[1];

        !!postVarValue ? (
            res.writeHead(200, "OK", headers),
            res.end(createPayload(200, req, postVarValue))
        ) : (
            res.writeHead(400, 'Bad Request', headers),
            res.end(createPayload(400, req))
        )

      });
    } // if (req.method === 'POST')

    if (req.method === 'GET') {
      // handle our get on /
      res.writeHead(200, 'OK', headers);
      res.end(createPayload(200, req));
    }

  } else if (req.url === '/favicon.ico') {
    // never forget the favicon!

    var favicon = new Buffer('AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAABAAAAAYAAAAJAAAADAAAAA8AAAASAAAAEwAAABYAAAAXAAEDCgAAAAEAAAAAAAAAAQAAAAEAAAACAAAABgAAAAkAAAAPAAAAFgAAACAAAAApAAAAMAAAADIAAAA3UpXF/zZwqP8AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBC8CAD+b/0ql3P8NMWKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBC8CGCOk/xcipv9PqOH/ATVhBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADXCv/x4pmP9Iq+H/Xbzr/x1wtZ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFB6p/5ja8/9brun/Xq/s/2q27P84e7mDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEx2U/yAtrv9De8n/idTy/yRv1/9yvvD/J0xmSwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj7jY/4XP7v9PnNv/d8fp/xgjoP8XIqr/FB+p/yRDX3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALYG+/3TH7P93tuX/Hi3C/5XL6v+J0u3/DxeF/57X8P9Th7yZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADB51/yWOzv9VsN//Gyeh/x0qsP8wR7T/l9Pu/3O15v+j0u3/VoW4hgAAAAAAAAAAAAAAAAAAAAAAAAAADiaU/yBd0P8bR6v/fsjn/1Jhuf8zPaj/kdrw/2614/8YLcD/MKbd/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABg/of9EmeP/Nobe/x5MqP8SLYb/ocPj/1W64v8PGZT/ERue/xsnqv8rPVh5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEmioTmBz/8xd9n/PZjj/zl8xf+Ap9H/aqTT/ztlt/9yst//RHq1swAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ2Os3k6j3P9Xs+r/RKjn/ziN4P8eUMH/HU2y/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI1us/yNWtP8zddL/IFjL/xhJxv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP/zAAD/4wAA/8cAAP+DAAD/AwAA/gcAAPwHAAD4AwAA8AMAAOAHAADgBwAA8AMAAPwHAAD/BwAA//8AAA==', 'base64');

    res.writeHead(200, "OK", { 'Content-Type': 'image/x-icon' });
    res.end(favicon);

  } else {
    // handle routes other than / and unsupported verbs
    res.writeHead(503, 'Not implemented', headers);
    res.end(createPayload(503, req));

  }

}); //var server

server.listen(8000);


/////////////
// HELPERS //
/////////////

/**
 * Given an http request, a response code and an optional postData, generate the html markup response
 * @param  {number} code      http status code
 * @param  {object} request   the node http request
 * @param  {string} postData  [optional] used to pass the postData after a 200-OK from post
 * @return {string}           a string object with our assembled markup
 */
function createPayload(code, request, postData) {

  var payload = '<html><head>';

  if (code === 200 && !postData) {
    payload +=  '<title>200 - OK</title></head><body><h1>200 - OK</h1><h1>Your language is: ' +
                request.headers['accept-language'] + '</h1><h1>You sent a: ' +
                request.method + ' to ' + request.url + '</h1>';
  }

  if (code === 200 && request.method === 'POST' && !!postData) {
    payload +=  '<title>200 - OK</title></head><body><h1>200 - OK</h1><h1>Your language is: ' +
                request.headers['accept-language'] + '</h1><h1>You sent a: ' +
                request.method + ' to ' + request.url + '</h1><h1>Your POST variable value: ' + postData + '</h1>';
  }

  if (code === 400) {
    payload +=  '<title>400 - Bad Request</title></head><body><h1>400 - Bad Request</h1><h1>You sent a: ' +
                request.method + ' to ' + request.url + '</h1><h1>Could not process query because postVar was empty</h1>';
  }

  if (code === 503) {
    payload +=  '<title>503 - Not Implemented</title></head><body><h1>503 - Not Implemented</h1>' +
                '<h1>You sent a: ' + request.method + ' to ' + request.url + '</h1>';
  }

  return payload += '</body></html>';

}
