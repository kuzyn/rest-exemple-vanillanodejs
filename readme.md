## Description
### :dancers: :dancers: :dancers:

### nodejs REST example

Super tiny RESTful API example in vanilla [nodejs](http://nodejs.org/)  

One file, just over a hundred line of code, zero dependencies, a single module require (http, duh!), get and post handling at `/`, error handling for all the rest, and a pizza favicon for good measure.

Not fit for production :scream_cat:

## Deploy

Well, that's a pretty basic:

```bash
$ node app.js
```
and either visit `localhost:8000` in your browser, hit it up with [Postman](https://www.getpostman.com/) or curl it like so:  
```bash
$ curl -i localhost:8000  
$ curl -i --data "postVar=foo" localhost:8000  
$ curl -i -X PUT -d "putVar=foo" localhost:8000  
$ curl -i -X DELETE "putVar=foo" localhost:8000  
$ curl --request PATCH localhost:8000  
```
*From top to bottom: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`*  

**`POST` queries on `/` will process only *x-www-form-urlencoded* & *raw* (i.e. `postVar=foo`) bodies**

## API
Here are the default routes:  

Route | Type | Return | Payload | Description
--- | --- | --- | --- | ---
*/*       | **[GET]**     | Object  | n/a | Returns an HTML response
*/*       |  **[POST]**   | Object  | {postVar: *string*} | Returns an HTML response (returns a 400 error if postVar is null)
*/*       | **[ALL OTHER VERBS]**       | Object  | n/a | Returns an HTML error

### Result examples
Return body on success:
```html
<html>
 <head><title>200 - OK</title></head>
 <body>
  <h1>200 - OK</h1>
  <h1>Your language is: en-US,en;q=0.8,fr-CA;q=0.6,fr;q=0.4</h1>
  <h1>You sent a: POST to /</h1>
  <h1>Your POST variable value: foo</h1>
 </body>
</html>
```  

Return body on error:
```html
<html>
 <head><title>503 - Not Implemented</title></head>
 <body>
  <h1>503 - Not Implemented</h1>
  <h1>You sent a: PATCH to /</h1>
 </body>
</html>
```

## License
The MIT License (MIT)
Copyright (c) 2016 Samuel Cousin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
