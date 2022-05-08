import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeader from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState([])

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&type&y&page&callback&v&apikey=${process.env.REACT_APP_ODB_API_KEY}`

    const response = await fetch(url)

    const responseJson = await response.json()

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items))
  }

  const AddFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  const RemoveFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(favorite => favorite.imdbID !== movie.imdbID)
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  useEffect(() => {
    getMovieRequest(searchValue)

    if(localStorage.getItem("react-movie-app-favorites")) {
      const list = JSON.parse(localStorage.getItem("react-movie-app-favorites"))
      setFavorites(list)
    }

  }, [searchValue])

  return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeader heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavoritesClick={AddFavoriteMovie}
					favoriteComponent={AddFavorites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeader heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favorites}
					handleFavoritesClick={RemoveFavoriteMovie}
					favoriteComponent={RemoveFavorites}
				/>
			</div>
		</div>
  );
}

export default App;
