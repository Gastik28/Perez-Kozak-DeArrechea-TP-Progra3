import React, { Component } from "react";
import "./styles.css";
const apikey = "66374e925f9ce0061d8e10191732f374";

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Usamos las Props dentro del Estado
      id: props.match.params.id, //Recuperamos la data de la URL parametrizada --> Id
      type: props.match.params.type, //Recuperamos la data de la URL parametrizada --> Type
      MoviesDetalles: [],
      SeriesDetalles: [],
      pedidoInicialCompleto: false, // Nuevo estado para controlar la carga
      esFav: false
    };
  }
  componentDidMount() {
    {
      //si la variable Type del estado es movies --> Hace esto, sino ---> lo otro
      this.state.type === "movie"
        ? // All Movies Fetch
          fetch(
            `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                MoviesDetalles: data,
                pedidoInicialCompleto: true, // Confirmamos que recibimos la Data
              });
              this.checkIfFavorite(); //Chequea si el elemento esta en favs. Si el elemento esta muestra el boton correcto
            })
        : // All Series Fetch
          fetch(
            `https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=${apikey}`
          )
            .then((resp) => resp.json())
            .then((data) => {
              this.setState({
                SeriesDetalles: data,
                pedidoInicialCompleto: true,
              });
              this.checkIfFavorite();
            });
    }
  }

  checkIfFavorite() {
    const storageKey =
      this.state.type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = this.state.id;

    let recuperoFav = localStorage.getItem(storageKey);

    if (recuperoFav) {
      let favParceado = JSON.parse(recuperoFav);
      if (favParceado.includes(Number(currentId))) {
        this.setState({ esFav: true });
      }
    }
    // Verifica si el elemento actual (película o serie) ya está en favoritos (localStorage).
    // Si el ID está en el array de favoritos, pone el estado esFav en true.
    // Es lo mismo que lo que hace el component did mount en Card.js que chequea si es fav o no antes de que la data llegue
    // Aca tmb lo ves cuando la data llega porque lo haces justamente despues del fetch porque no podes hacerlo sin que los datos llegue
    // asi que no lo podes hacer en el didmount de una como card, hay que hacer primero el fetch 
  }

  agregarFav() {
    const storageKey =
      this.state.type === "movie" ? "favoriteMovies" : "favoriteSeries";
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

  sacaFav() {
    const storageKey =
      this.state.type === "movie" ? "favoriteMovies" : "favoriteSeries";
    const currentId = this.state.id; // Solo el ID

    let recuperoFav = localStorage.getItem(storageKey);

    if (recuperoFav) {
      let favParceado = JSON.parse(recuperoFav);
      // Filtra el ID actual
      let filter = favParceado.filter((elm) => elm != currentId);
      localStorage.setItem(storageKey, JSON.stringify(filter));
    }

    this.setState({ esFav: false });
    // aca no esta "if (this.props.onClick) this.props.onClick();" 
    // porque Detalle no necesita avisarle a un componente padre que refresque una lista.
  }

  render() {
    return (
      <main>
        {
          // Si el pedidoInicial se completo, osea es True--> Renderiza todo, sino --> "Cargando..."
          this.state.pedidoInicialCompleto ? (
            <div className="detail-container">
              <div className="detail-poster">
                {/* Img */}
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
                {/* H1 */}
                <h1 className="detail-title">
                  {this.state.type === "movie"
                    ? this.state.MoviesDetalles?.original_title
                    : this.state.SeriesDetalles?.original_name}
                </h1>

                {/* Descripcion */}
                <p className="detail-overview">
                  {this.state.type === "movie"
                    ? this.state.MoviesDetalles?.overview
                    : this.state.SeriesDetalles?.overview}
                </p>
                <div className="detail-meta">
                  {/* Fecha estreno */}
                  <p>
                    Fecha de estreno:{" "}
                    {this.state.type === "movie"
                      ? this.state.MoviesDetalles?.release_date
                      : this.state.SeriesDetalles?.first_air_date}
                  </p>

                  {/* Duracion */}
                  {this.state.type === "movie" ? (
                    <p>
                      Duración: {this.state.MoviesDetalles?.runtime} minutos
                    </p>
                  ) : null}

                  {/* Rating  */}
                  <p>
                    Rating:{" "}
                    {this.state.type === "movie"
                      ? this.state.MoviesDetalles?.vote_average
                      : this.state.SeriesDetalles?.vote_average}
                  </p>

                  {/* Genero */}
                  <p>
                    Género:{" "}
                    {(this.state.type === "movie"
                      ? this.state.MoviesDetalles?.genres
                      : this.state.SeriesDetalles?.genres
                    )
                      ?.map((g) => g.name).join(", ")} 
                      {/* El "?" es para que no rompa el codigo y devuelva undefined */}
                      {/* si MoviesDetalles existe accede a genre, sino es undefined y no rompe */}
                      {/* El .join(", ") Convierte el array de nombres en un string separado por comas */}
                  </p>
                </div>

                <div className="detail-buttons">
                  {/* Boton Fav */}
                  {this.state.esFav ? (
                    <button onClick={() => this.sacaFav()}>
                      Eliminar de favoritos
                    </button>
                  ) : (
                    <button onClick={() => this.agregarFav()}>
                      Agregar a favoritos
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Cargando....
            <h2 className="loading">Cargando...</h2>
          )
        }
      </main>
    );
  }
}

export default Detalle;
