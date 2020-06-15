/*CALLBACKS
callback function: a function executed by another function. Usually occurs when data needs to be 
processed or modified in some way so that it can be used later within the original function.
*/
function callbackFunction(){
    for (let i = 0; i < 100; i++){
        console.log(i);
    }
    const data = {
        name: 'Ralf Machio',
        age: 66,
        occupation: 'kickboxing',
    }
    return data;
};

function showGreeting(dataFromFunction){
    return "hello " + dataFromFunction.name + ",  hear you're the greatest!?"
};

console.log(
    showGreeting(callbackFunction())
);

/* PROMISES
promise: object that represent the eventual completion (or failure) of an asynchronous operation, and its resulting value
basically, a Promise is code that is on it's way after it finishes running somewhere else

State of Promise: 
- Pending
- Resolved
- Rejected
*/
//Creating a Promise
//boolean declaration
var amIGood = false;

//Promise itself
var iCanHasGift = new Promise(
    function (resolve, reject){
        if (amIGood) {
            var gift = {
                brand: 'HasMattelbro',
                item: 'Turbo-Man action figure'
            };
        resolve(gift); //fulfilled
        } else {
            var naughty = "You've made Santa's naughty list; enjoy your coal!";
            reject(naughty); //rejected
        }
    }
);

/* Proper Promise Syntax: 

new Promise(/executor/ function (resolve, reject) {...});
*/

//Promise call
var checkTwice = function (){
    iCanHasGift.then(function(fulfilled){
        //nice list = gift
        console.log(fulfilled);
        //output: {brand: 'HasMattelBro', item: 'Tubro-Man action figure'}
    })
    .catch(function(error){
        //naughty list = coal
        console.log(error);
        //output: "You've made Santa's naughty list..."
    });
};
checkTwice();

//Promises are asynchronous: each promise starts when the previous succeeds and uses the previous promise's result.

//2nd promise
var playDate = function (gift){
    return new Promise(
        function (resolve, reject){
            var message = "Salutations fellow child I enjoy interacting with! I notice you received a posable plastic Batman figurine during the Yultide season. What do you think of my new " + gift.brand + " " + gift.item + "?";

            resolve(message);
        }
    );
};

//promise call
var checkTwice = function (){
    console.log('before Christmas'); //log before
    iCanHasGift
        .then(playDate)
        .then(function (fulfilled){
            console.log(fulfilled);
        })
        .catch(function(error){
            console.log(error)
        });
        console.log('after opening gifts'); //log after
}

checkTwice();

//Chaining Promises
var playDate = function(gift){
    return new Promise(
        function(resolve, reject){
            var message = "Salutations fellow child I enjoy inter.... What do you think o fmy new " + gift.brand + " " + gift.item + "?";

            resolve(message);
        } //NOTICE the reject wasn't called...it's optional!!
    );
}
//we can refactor this using promise.resolve
var playDate = function(gift){
    var message = "salutation.... message";

    return Promise.resolve(message);
}

//Now chaining two promises together
var checkTwice = function (){
    iCanHasGift
    .then(playDate) //chain here
    .then(function (fulfilled){
        console.log(fulfilled);
    })
    .catch(function (error){
        console.log(error);
    });

};
checkTwice();