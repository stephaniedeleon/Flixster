const moviesForm = document.querySelector("form");
const moviesArea = document.querySelector(".movies-area");

const moreBtn = document.querySelector(".more button");

const api_key = "9931bbb3d3b44293f08d37aeae81af82";

let page = 1;
let col = 0;

//displaying current movies
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

//searches movies
moviesForm.addEventListener("submit", displaySearched);

async function displaySearched(event) {
    event.preventDefault();

    clearHTML();

    const movieInput = event.target.movie;
    const movie = movieInput.value;

    if (movie == "") {
        displayMovies();
        return;
    }

    const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=" +  api_key + "&query=" + movie + "&language=en&page=" + page;

    const response = await fetch(apiURL);
    const responseData = await response.json();

    //displays the movies searched
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
    `;

    /*
        <figure>
            <img src="${uri}" alt="${title}"/>
            <figcaption>${title} ${vote}</figcaption>
        </figure>
    */

    /*col++;
    if (col == 4) {
        moviesArea.innerHTML += `
        `
        col=0;
        console.log("in");
    }*/
}

function clearHTML() {

    moviesArea.innerHTML = `
    `;
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