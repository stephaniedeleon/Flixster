const moviesForm = document.querySelector("form");
const moviesArea = document.querySelector(".movies-area");

const page_title = document.querySelector("#page-title")

const moreBtn = document.querySelector(".more button");

const api_key = "9931bbb3d3b44293f08d37aeae81af82";

let page = 1;
let col = 0;

//displaying current movies
async function displayMovies() {

    moreBtn.classList.remove('hidden');

    const apiURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" +  api_key + "&language=en&page=" + page;

    const response = await fetch(apiURL);
    const responseData = await response.json();
    
    //changes the name to "Now playing"
    page_title.innerHTML = `
        Now playing
    `;
    
    //displays the movies
    responseData.results.forEach((movie) => {
        generateHTML(movie);
    });
}

//searches movies
moviesForm.addEventListener("submit", displaySearched);

async function displaySearched(event) {
    event.preventDefault();

    page=1; //restarts the pages for now playing

    moreBtn.classList.add('hidden');
    clearHTML();

    const movieInput = event.target.movie;
    const movie = movieInput.value;

    if (movie == "") {
        displayMovies();
        return;
    }

    const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=" +  api_key + "&query=" + movie + "&language=en";

    const response = await fetch(apiURL);
    const responseData = await response.json();

    //changes the name of "Now playing" to the Search Item
    page_title.innerHTML = `
        Results for "${movie}"
    `;

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
    <figure>
        <img src="${uri}" alt="${title} poster"/>
        <figcaption> 
            <div class="movie-title">
                ${title}
            </div>
            <div class="rating">
                <span style="font-size:14px; color:yellow;"> &#9733;</span> ${vote} 
            </div>
        </figcaption>
    </figure>
    `;
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