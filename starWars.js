const peopleSearch = document.querySelector('#people');
const planetsSearch = document.querySelector('#planets');
const starshipsSearch = document.querySelector('#starships');
const speciesSearch = document.querySelector('#species');
const ul = document.querySelector('.listField');
const heading = document.querySelector('.heading');
const result = document.querySelector('.results');
const secondResults = document.querySelector('.secondaryResults');
const secondList = document.querySelector('.secondList');
const secondHeading = document.querySelector('.secondHeading');
const popupWrapper = document.querySelector('.popup-wrapper');
const popup = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');
const subHead = document.querySelector('.sub-heading');



const baseURL = "https://swapi.co/api/"
// let count = 1;
let clicked = false;
let theForce;


peopleSearch.addEventListener('click', fetchResults);
planetsSearch.addEventListener('click', fetchResults);
starshipsSearch.addEventListener('click', fetchResults);
speciesSearch.addEventListener('click', fetchResults);

close.addEventListener('click', ()=>{
    popup.style.display = 'none';
    })

popup.addEventListener('click', ()=>{
    popup.style.display = 'none';
    })

ul.addEventListener('click', e => {
    // sets up event for each li element 
    console.log(e);
    console.log(e.target.firstElementChild.innerText);
    //captues the previous saved url for the main list item clicked
   let charURL = e.target.firstElementChild.innerText;
    // if statment to confirm a li element was actually clicked
    if (e.target.tagName === "LI"){
        // console.log(e.target.innerText);
        // console.log(list);
        clicked = true; //set 'true' an li item was clicked
        console.log(clicked);
        fetchResults(charURL);//passes url for next fetch 
    }
})

function fetchResults(e){
    
    
    // console.log(clicked);
    //has li element be clicke true or false
    console.log(e);//event passed from buttons or paramater sent from list element event listenter
    let ending;
    let theForce;
    result.style.display ="block";

    if(clicked === false){ //testing wether a li element has been clicked to adjust the url
        ending = e.target.value;// this url ending if a button press
       theForce =baseURL + ending;
    }
    if(clicked === true){//this url ending if list element clicked

        theForce = e;
    }
    // console.log(theForce);
    clicked = false;
    

    fetch(theForce) //  (baseURL + ending) or url passed from li element event click
        .then(function(response){
            // console.log(response);
            return response.json();
            
        })
        .then(function(json){
            console.log(json);
            let items = json.results;
            console.log(items);

            
           //need to test for obj or array as second click comes back as an object and first button is an array
                if (items instanceof Array){
                    // console.log('we have an array');
                    ul.innerHTML = "";//resets main list field
                    for(el of items) {
                        subHead.style.display = "block";//unhides list heading
                        let li = document.createElement('li'); 
                        li.innerHTML = el.name;
                        let span = document.createElement('span');
                        span.innerHTML = el.url;//saves url for this list elemement to be used in next search
                        span.style.display = "none";
                        li.append(span);    
                        ul.append(li); 
                        heading.innerHTML = e.target.innerText;//assigns from button to heading
                        heading.setAttribute('value', e.target.value);//saving search value for reference if neaded
                    }
                    
                }
                else{
                    console.log(json.name);
                    secondList.innerHTML ="";
                    popupWrapper.style.display = "block"//shows hidden div
                    secondHeading.innerHTML = json.name;//assigns list name to <h> el
                    secondHeading.setAttribute('value', json.name);//saved for ref.
                    console.log(json.films);
                    for(el of json.films){
                    console.log(el);
                    fetch(el).then(results => results.json()).
                    then(json => {
                    console.log(json)
                    let li = document.createElement('li'); 
                    li.innerHTML = `\"${json.title}\" - release date: ${json.release_date}`;
                    let crawl = document.createElement('p');
                    crawl.innerHTML = json.opening_crawl;
                    li.append(crawl);
                    secondList.append(li); 
                    //saving search value to be pulled for next url search 
                })
            };
                        
                    }
                });

            
            
};




