import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Favoritos extends Component {
    constructor(props){
      super(props)
      this.state = {
        favoriteMovies: [],
        favoriteSeries: []
      }
    }
    
    componentDidMount(){
        this.refrescar()
      }
      
      refrescar(){
        const moviesRaw = localStorage.getItem('favoriteMovies')
        const seriesRaw = localStorage.getItem('favoriteSeries')
    
    let movies = []
    let series = []

    if(moviesRaw !== null){
        movies = JSON.parse(moviesRaw)
      }
  
      if(seriesRaw !== null){
        series = JSON.parse(seriesRaw)
      }

    this.setState({ 
      favoriteMovies: movies, 
      favoriteSeries: series })
  }

  removeFavorite = (type, id) => {
    if(type === 'movie'){
      const updated = this.state.favoriteMovies.filter(item => item.id !== id)
      localStorage.setItem('favoriteMovies', JSON.stringify(updated))
      this.setState({ favoriteMovies: updated })
    } else {
      const updated = this.state.favoriteSeries.filter(item => item.id !== id)
      localStorage.setItem('favoriteSeries', JSON.stringify(updated))
      this.setState({ favoriteSeries: updated })
    }
  }
  borrarTodos(){
    localStorage.setItem('favoriteMovies', JSON.stringify([]))
    localStorage.setItem('favoriteSeries', JSON.stringify([]))
    this.setState({ favoriteMovies: [], favoriteSeries: [] })
  }

  renderItem = (item, type) => {
    return (
      <div key={item.id}>
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
        <h3>{item.original_title || item.original_name}</h3>
        <Link to={`/detalle/${type}/${item.id}`}>Ver detalle</Link>
        <button onClick={() => this.removeFavorite(type, item.id)}>Eliminar</button>
      </div>
    )
  }

render() {
  return (
    <div>
      <h1>Mis Favoritos</h1>
      
      <h2>Películas favoritas</h2>
      <section className='Section_container'>
        {this.state.favoriteMovies.length === 0 ? (
          <p>No hay películas favoritas.</p>
        ) : (
          this.state.favoriteMovies.map(item => this.renderItem(item, 'movie'))
        )}
      </section>

      <h2>Series favoritas</h2>
      <section className='Section_container'>
        {this.state.favoriteSeries.length === 0 ? (
          <p>No hay series favoritas.</p>
        ) : (
          this.state.favoriteSeries.map(item => this.renderItem(item, 'tv'))
        )}
      </section>

      <div>
        <button onClick={() => this.refrescar()}>Refrescar</button>
        <button onClick={() => this.borrarTodos()}>Borrar todos</button>
      </div>
    </div>
  )
}
}

export default Favoritos
