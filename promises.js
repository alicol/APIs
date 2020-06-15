//API = application programming interface
//API's are a big part of web design, pulling data from outer sources
//to understand API's, we first need to understand promises

setTimeout(() => console.log('this is a test of timeouts!'), 1000); //1000 milliseconds

let promise = new Promise(function(resolve, reject){
    setTimeout(() => {
        if (true){
            resolve('success');
        } else {
            reject('failure');
        }
    }, 3000);
});

promise
    .then(success => console.log(success)) //.then handles success
    .catch(err => console.log(err));    //.catch catches error


console.log("this code is after our promise and .then chain!");

function playFunc(){
    return 5;
};

console.log(playFunc());