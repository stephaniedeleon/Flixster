const moviesForm = document.querySelector("form");
const moviesArea = document.querySelector(".movies-area");

const moreBtn = document.querySelector(".more button");

const api_key = "9931bbb3d3b44293f08d37aeae81af82";

let page = 1;
let col = 0;

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

    const uri = "https://image.tmdb.org/t/p/original/" + movie.poster_path;
    const title = movie.original_title; 
    const vote = movie.vote_average;

    moviesArea.innerHTML += `
        <img src="${uri}" alt="${title}"/>
        <p>${title} ${vote}</p> 
    `;

    /*col++;
    if (col == 4) {
        moviesArea.innerHTML += `
        `
        col=0;
        console.log("in");
    }*/
}

//adding more movies...

moreBtn.addEventListener("click", getMore);
async function getMore() {
    page++;
    displayMovies();
}

window.onload = function () {
    // run your function here to make it execute as soon as the page loads
    displayMovies();
}