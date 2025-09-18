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
    } else {
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
      <div>
         {this.state.pedidoInicialCompleto ? ( 
          <div>
        <h1> 
          {
            this.state.type === "movie"
              ? this.state.MoviesDetalles.original_title:
              this.state.SeriesDetalles.original_name

          } 
        </h1>

        {
          this.state.type === "movie"
              ? <img  src={`https://image.tmdb.org/t/p/w500${this.state.MoviesDetalles.poster_path}`} alt="" />
              :
              <img  src={`https://image.tmdb.org/t/p/w500${this.state.SeriesDetalles.poster_path}`} alt="" />        
        }
        <h2>Descripcion</h2>
        <p>
          {
            this.state.type === "movie"
              ? this.state.MoviesDetalles.overview:
              this.state.SeriesDetalles.overview
          }
        </p>
        <p>Fecha de estreno:
          {
            this.state.type === "movie"
              ? this.state.MoviesDetalles.release_date
              :
              this.state.SeriesDetalles.first_air_date

          }        
        </p>
        <p>
          {
            this.state.type === "movie"
              ? "Duracion: " + this.state.MoviesDetalles.runtime + " minutos"
              :
              ""

          }     
        </p>
        <p>Rating:
          {
            this.state.type === "movie"
              ? this.state.MoviesDetalles.vote_average
              :
              this.state.SeriesDetalles.vote_average

          }      
        </p>
        <p>Genero:
          {/* Hacer el loader primero y ver si saco esto porque no se si lo vimos */}
              {
              this.state.type === "movie"
      ? this.state.MoviesDetalles?.genres?.map((genre) => genre.name)
      : this.state.SeriesDetalles?.genres?.map((genre) => genre.name)
            }      
          </p>
          {this.state.esFav ? (
              <button onClick={() => this.sacaFav()}>
                Sacar de favoritos
              </button>
            ) : (
              <button onClick={() => this.agregarFav()}>
                Agregar a favoritos
              </button>
            )}
          </div>
        ) : (
          <h2>Cargando...</h2>
        )}
      </div>
    );
  }
}

export default Detalle;



