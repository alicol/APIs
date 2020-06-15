//FETCH: allows us to fetch or pull resources from across the web (text files, code, data and more)
/* the basic model of fetch
1. the fetch method takes in your desired resource's path as a mandatory argument
2. the request object returns a promise that resolves to the argument's response
3. after retrieving a response, a multitude of methods define the body content and how it will be handled
4. you can use the request() and response() constructors to directly create requests and responses, but they are most likely to be created by other API actions

Basic fetch components:
- GlobalFetch - contains the fetch() used to fetch a resource
- headers - HTTP response/request headers can be queried and allow you to do things such as retrieving, updating, or deleting
- request - a resource request. It contains the method of request (GET, POST, etc), the url, associated headers, adn more
- response - the response to the request. It contains the headers and url, but more importantly replies with the status code to determine whether or not the request was successful
- body - contains methods relating to the main content of the response/request that allow you to specify content type and how to handle it
*/
//basic example of fetch request
fetch('http://example.com/movies.json') //url is the argument
    .then(function(response){
        return response.json();   //will extract JSON
    })
    .then(function(myJson){
        console.log(myJson)
    });