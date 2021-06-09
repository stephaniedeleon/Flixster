const moviesForm = document.querySelector("form");
const moviesArea = document.querySelector(".movies-area");

const moreBtn = document.querySelector(".more button");

const api_key = "9931bbb3d3b44293f08d37aeae81af82";

let page = 1;

async function displayMovies() {

    const apiURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" +  api_key + "&language=en&page=" + page;

    const response = await fetch(apiURL);
    const responseData = await response.json();
    
    console.log(responseData);
    
    //displays the movies
    responseData.results.forEach((movie) => {
        generateHTML(movie);
    });
}

function generateHTML(movie) {

    //const uri = "https://api.themoviedb.org/3/movie/" + movie.id  + "/images?api_key=" + api_key + "&language=en-US"; 
    const uri = movie.poster_path;
    const title = movie.original_title; 
    const vote = movie.vote_average;

    console.log(uri);

    moviesArea.innerHTML += `
        <img src="${uri}" alt="${title}"/>
        <p>${title} ${vote}</p>  
    `;
}

//moviesForm.addEventListener("submit", getResults);

window.onload = function () {
    // run your function here to make it execute as soon as the page loads
    displayMovies();
}