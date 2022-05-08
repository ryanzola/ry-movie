const MovieList = ({ movies, handleFavoritesClick, favoriteComponent }) => {
  const FavoriteComponent = favoriteComponent

  return (
		<>
			{ movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => handleFavoritesClick(movie)}
						className='overlay d-flex gap-2 align-items-center justify-content-center'
					>
						<FavoriteComponent />
					</div>
				</div>
			))}
		</>
  )
}

export default MovieList