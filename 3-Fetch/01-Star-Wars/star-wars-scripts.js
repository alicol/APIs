var starWarsPeopleList = document.querySelector("ul");

fetch("https://swapi.co/api/people");
.then(function(response){
    return response.json();
})
.then(function(json){

});