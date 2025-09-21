import React, { Component } from "react";
const apikey = "66374e925f9ce0061d8e10191732f374";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      type: props.match.params.type,
      MoviesDetalles: [],
      SeriesDetalles: [],
      pedidoInicialCompleto: false// Nuevo estado para controlar la carga
      
    };
  }
  componentDidMount() {
    {
      this.state.type === "movie"
        ? fetch(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesDetalles: data,
                pedidoInicialCompleto: true // Marcar como completo cuando se recibe la data
              });
              this.checkIfFavorite();
            })
        : fetch(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesDetalles: data,
                pedidoInicialCompleto: true 
              });
              this.checkIfFavorite();
            });
    }
  }

  checkIfFavorite(){
    const storageKey = this.state.type === "movie" ? "favoriteMovies" : "favoriteSeries";
  const currentId = this.state.id;   

  let recuperoFav = localStorage.getItem(storageKey);

  if (recuperoFav) {
    let favParceado = JSON.parse(recuperoFav);
    if (favParceado.includes(currentId)) {
      this.setState({ esFav: true });
      }
    }
  }

  agregarFav(){
    const storageKey = this.state.type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = this.state.id; // Solo el ID
  
    let recuperoFav = localStorage.getItem(storageKey);
  
    if (recuperoFav == null) {
      // Si no hay favoritos, crea un array con el ID actual
      let fav = [currentId];
      localStorage.setItem(storageKey, JSON.stringify(fav));
    } 
    else {
      // Si ya hay favoritos, agrega el ID actual
      let favParceado = JSON.parse(recuperoFav);
      if (!favParceado.includes(currentId)) {
        favParceado.push(currentId);
        localStorage.setItem(storageKey, JSON.stringify(favParceado));
      }
    }
  
    this.setState({ esFav: true });
  }
  

  sacaFav(){
    const storageKey = this.state.type === "movie" ? "favoriteMovies" : "favoriteSeries";
  const currentId = this.state.id; // Solo el ID

  let recuperoFav = localStorage.getItem(storageKey);

  if (recuperoFav) {
    let favParceado = JSON.parse(recuperoFav);
    // Filtra el ID actual
    let filter = favParceado.filter((elm) => elm !== currentId);
    localStorage.setItem(storageKey, JSON.stringify(filter));
  }

  this.setState({ esFav: false });
  }


  render() {
    console.log("Movie", this.state.MoviesDetalles);
    console.log("serie", this.state.SeriesDetalles);

    return (
      <main>
        {this.state.pedidoInicialCompleto ? (
          <div className="detail-container">
            <div className="detail-poster">
              <img
                src={
                  this.state.type === "movie"
                    ? `https://image.tmdb.org/t/p/w500${this.state.MoviesDetalles?.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${this.state.SeriesDetalles?.poster_path}`
                }
                alt=""
              />
            </div>

            <div className="detail-info">
              <h1 className="detail-title">
                {this.state.type === "movie"
                  ? this.state.MoviesDetalles?.original_title
                  : this.state.SeriesDetalles?.original_name}
              </h1>

              <p className="detail-overview">
                {this.state.type === "movie"
                  ? this.state.MoviesDetalles?.overview
                  : this.state.SeriesDetalles?.overview}
              </p>

              <div className="detail-meta">
                <p>
                  Fecha de estreno:{" "}
                  {this.state.type === "movie"
                    ? this.state.MoviesDetalles?.release_date
                    : this.state.SeriesDetalles?.first_air_date}
                </p>

                {this.state.type === "movie" ? (
                  <p>Duración: {this.state.MoviesDetalles?.runtime} minutos</p>
                ) : null}

                <p>
                  Rating:{" "}
                  {this.state.type === "movie"
                    ? this.state.MoviesDetalles?.vote_average
                    : this.state.SeriesDetalles?.vote_average}
                </p>

                <p>
                  Género:{" "}
                  {(this.state.type === "movie"
                    ? this.state.MoviesDetalles?.genres
                    : this.state.SeriesDetalles?.genres
                  )?.map((g) => g.name).join(", ")}
                </p>
              </div>

              <div className="detail-buttons">
                {this.state.esFav ? (
                  <button onClick={() => this.sacaFav()}>Sacar de favoritos</button>
                ) : (
                  <button onClick={() => this.agregarFav()}>Agregar a favoritos</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="loading">Cargando...</h2>
        )}
      </main>
    );
  }
}

export default Detalle;



