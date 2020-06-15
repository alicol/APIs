const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"; //1
const key = "CGEKLjAFpaXmJOCfMmNDrqkz9nt1HjCg";
let url;

//SEARCH FORM           prepping elements in the html to be filled with data grabbed during fetch
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none';

let pageNumber = 0;
let displayNav = false;

searchForm.addEventListener('submit', fetchResults); //when someone clicks "submit", our fetch function is called 
nextBtn.addEventListener('click', nextPage); 
previousBtn.addEventListener('click', previousPage);

function fetchResults(e){ //fetches NYT data!  //e is passed through this function because it is called by an EventListener!
    e.preventDefault(); //prevents data from being submitted to a database/ something being refreshed
    
    //assemble the full URL
    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.Value}`; //pieces together correct url
    console.log('URL: ', url);
    //conditional
    if (startDate.value !== ''){  //IF there is a start date value...
        console.log(startDate.value)
        url += '&begin_date' + startDate.value;  //adds date criteria to URL
    }

    if(endDate.value !== ''){  //IF there is an end date value...
        console.log(endDate.value)
        url += '&end_date=' + endDate.value; //adds date criteria to URL
    }
    
   
    fetch(url)  //uses customized url to fetch the correct data!
        .then(function(result){
            console.log(result) 
            return result.json(); //2  //jsonify data 
        }) .then(function(json){
            displayResults(json); //3   //calls display results function
        })
}

function displayResults(json){  
    let articles = json.response.docs;  //creates to represent our response

    while (section.firstChild){
        section.removeChild(section.firstChild);  //this clears previous search if it exists
    }
    
    if(articles.length === 0){
        console.log("No results");    //default if nothing comes back from the search
    } else {
        for(let i = 0; i < articles.length; i++){   //a loop to run through articles and give each piece of data the correct formatting on our HTML
            console.log(i);
            let article = document.createElement('article');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let para = document.createElement('p');
            let clearfix = document.createElement('div');

            let current = articles[i];
            console.log("Current:", current);

            link.href = current.web_url;   //pulling the current value of the article as the href property for the link element being created on the HTML page
            link.textContent = current.headline.main; //makes the text for the link the title of the article

            para.textContent = 'Keywords: ';

            for(let j = 0; j < current.keywords.length; j++){
                let span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' '; //keywords of that specific article will be displayed 
                para.appendChild(span);
            }

            if(current.multimedia.length > 0){ //if there are photos/videos...
                img.src = 'http://www.nytimes.come/' + current.multimedia[0].url; //adds associated URL as image source to be displayed
                img.alt = current.headline.main; //if the image doesn't show, the headline will be displayed
            }

            clearfix.setAttribute('class', 'clearfix'); //clearfix clears child elements

            article.appendChild(heading);  //adds all elements to the page
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
    if (articles.length === 10){
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }

}

function nextPage(e){  
    pageNumber++;
    fetchResults(e);
    console.log("Page Number: ", pageNumber);
}

function previousPage(e){
    if (pageNumber > 0){
        pageNumber--;
        fetchResults(e);
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page: ", pageNumber);
}