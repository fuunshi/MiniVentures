apiKey = '31730a99';

async function getData(url) {
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Network response was not ok')
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.log('Error Fetching Data', error);
        return null;
    }
}

async function getMovieListByTitle(title) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`;
    const movieList = await getData(url);
    return movieList;
}

async function findMovie() {
    var movieName = document.querySelector('#search').value;
    if (movieName.trim() === ''){
        console.log('Null data detected')
        return
    }
    const data = await getMovieListByTitle(movieName);
    const movies = data.Search;
    displayMovies(movies);
    console.log(data);
}

function displayMovies(movies) {
    const searchList = document.querySelector('#search-list');

    const fragment = document.createDocumentFragment();

    const createMovieElement = (movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
        return movieDiv;
    };
    const movieElements= movies.map(createMovieElement);

    movieElements.forEach(movieElement => {
        fragment.appendChild(movieElement);
    });

    searchList.appendChild(fragment);
}

