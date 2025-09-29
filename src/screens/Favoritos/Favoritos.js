import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./styles.css";

const apikey = "66374e925f9ce0061d8e10191732f374";

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
      favoriteSeries: [],
    };
  }

  componentDidMount() {
    this.refrescar();
  }

  refrescar() {
    // Películas
    let recuperoFavMovies = localStorage.getItem("favoriteMovies"); // Recuperamos el ID de las peliculas que existen en el Local. Nos devuelve un string en formato JSON
    let favParceadoMovies = JSON.parse(recuperoFavMovies); // Pasamos las peliculas que estan en string en formato JSON a un Array JavaScript
    let favMovies = [];

    // Si existe favPareceadoMovies y tiene un leght mayor a 0... Esto es para que no crashee si esta vacio
    if (favParceadoMovies && favParceadoMovies.length > 0) {
      favParceadoMovies.map(
        (
          elm // Hacemos un Map a nuestro array con las movies del local que ya fue parceado
        ) =>
          fetch(`https://api.themoviedb.org/3/movie/${elm}?api_key=${apikey}`) //Elm --> Id. Recuperamos toda la info de ese elemento correspondiente del ID
            .then((resp) => resp.json())
            .then((data) => {
              favMovies.push(data); //Pusheamos la data a favMovies a un array para no pisarlos
              this.setState({ favoriteMovies: favMovies }); //Luego metemos la data de favMovies en nuestro estado para usarla en el render
            })
      );
    } else {
      this.setState({ favoriteMovies: [] }); //Si no hay favoritos, dejamos el Estado Vacio "No hay peliculas favoritos"
    }

    // Series --> Hago lo mismo
    let recuperoFavSeries = localStorage.getItem("favoriteSeries");
    let favParceadoSeries = JSON.parse(recuperoFavSeries);
    let favSeries = [];

    if (favParceadoSeries && favParceadoSeries.length > 0) {
      favParceadoSeries.map((elm) =>
        fetch(`https://api.themoviedb.org/3/tv/${elm}?api_key=${apikey}`)
          .then((resp) => resp.json())
          .then((data) => {
            favSeries.push(data);
            this.setState({ favoriteSeries: favSeries });
          })
      );
    } else {
      this.setState({ favoriteSeries: [] });
    }
  }

  borrarTodos() {
    localStorage.setItem("favoriteMovies", JSON.stringify([])); // Creo la clave del local de Movies y le pongo un array vacio en string
    localStorage.setItem("favoriteSeries", JSON.stringify([])); // Creo la clave del local de Series y le pongo un array vacio en string
    this.setState({ favoriteMovies: [], favoriteSeries: [] }); // actualizo el estado y vacio las series y peliculas fav 
  }

  render() {
    return (
      <main>
        <div className="favorites-container">
          <h1 className="page-title">Mis Favoritos</h1>

          <h2 className="section-title">Películas favoritas</h2>
          <section className="movies-grid">
            {/* Si favoritas esta vacia no hay pelis favoritas */}
            {this.state.favoriteMovies.length === 0 ? (
              <p className="favorites-empty">No hay películas favoritas.</p>
            ) : (
              // Hacemos un map de toda la data de las movies favoritas y se la mandamos a card
              this.state.favoriteMovies.map((item) => (
                <Card
                  key={item.id}
                  data={item}
                  type="movie"
                  onClick={() => this.refrescar()}
                />
              ))
            )}
          </section>

          <h2 className="section-title">Series favoritas</h2>
          <section className="movies-grid">
            {/* Si favoritas esta vacia no hay pelis favoritas */}
            {this.state.favoriteSeries.length === 0 ? (
              <p className="favorites-empty">No hay series favoritas.</p>
            ) :
              // Hacemos un map de toda la data de las series favoritas y se la mandamos a card
            (
              this.state.favoriteSeries.map((item) => (
                <Card
                  key={item.id}
                  data={item}
                  type="tv"
                  onClick={() => this.refrescar()}
                />
              ))
            )}
          </section>

          <div
            className="detail-buttons"
            style={{ marginTop: "2rem", justifyContent: "center" }}
          >
            {/* Boton de refrescar */}
            <button onClick={() => this.refrescar()}>Refrescar</button>

            {/* Boton de Borrar todos */}
            <button onClick={() => this.borrarTodos()}>Borrar todos</button>
          </div>
        </div>
      </main>
    );
  }
}

export default Favoritos;
